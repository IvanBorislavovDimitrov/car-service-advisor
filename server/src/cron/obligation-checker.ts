import client from '../db/db';
import { sendNotificationEmail } from '../utils/email';
import cron from 'node-cron';

export async function runObligationCheck() {
    const today = new Date();
    const nextWeek = new Date(today);
    nextWeek.setDate(today.getDate() + 7);

    console.log(`🕵️ Starting obligation check at ${today.toISOString()}`);
    console.log(`📅 Checking obligations ending before: ${nextWeek.toISOString()}`);

    try {
        const res = await client.query(`
      SELECT o.*, c.brand, c.model, co.email as owner_email
      FROM obligation o
      JOIN car c ON o.car_id = c.id
      JOIN car_owner co ON c.owner_id = co.id
      WHERE o.end_date <= $1
    `, [nextWeek]);

        console.log(`🔍 Found ${res.rows.length} obligations ending before ${nextWeek.toDateString()}`);

        for (const row of res.rows) {
            const endDate = new Date(row.end_date);
            const status = endDate < today ? 'expired' : 'upcoming';

            console.log(`📌 Obligation [${row.name}] for car ${row.brand} ${row.model} is ${status}. End date: ${endDate.toDateString()}`);
            const recipient = row.owner_email;
            if (!recipient) {
                console.warn(`⚠️ No owner email found for car ${row.brand} ${row.model}`);
                continue;
            }
            try {
                await sendNotificationEmail(
                    recipient,
                    `Obligation ${status.toUpperCase()} Reminder`,
                    `
                    <p><strong>Car:</strong> ${row.brand} ${row.model}</p>
                    <p><strong>Description:</strong> ${row.description}</p>
                    <p><strong>Obligation:</strong> ${row.name}</p>
                    <p><strong>Due:</strong> ${endDate.toDateString()}</p>
                    <p>Status: <strong>${status}</strong></p>
                    `
                );
                console.log(`📧 Email sent to ${recipient}`);
            } catch (err) {
                console.error(`❌ Failed to send email to ${recipient}`, err);
            }
        }

        console.log(`✅ Obligation check completed successfully.`);
    } catch (err) {
        console.error('❌ Failed during obligation check:', err);
    }
}

// Schedule to run every day at 9 AM
cron.schedule('0 9 * * *', () => {
    console.log('⏰ Scheduled obligation check triggered');
    runObligationCheck();
});