# Basic Car Service Advisor 🚗🛠️

A simple full-stack web application for managing car service records.  
Built with:

- React (Vite) for frontend
- Express with TypeScript for backend
- PostgreSQL for database
- `node-pg-migrate` for schema migrations
- Bootstrap for styling

---

## ✅ Prerequisites

- Node.js ≥ 18
- PostgreSQL installed and running
- `npm install` run in both `/client` and `/server`
- `.env` file created in `/server` with DB connection:

```env
PGHOST=localhost
PGPORT=5432
PGDATABASE=car_service
PGUSER=postgres
PGPASSWORD=your_password

# 1. Clone repo and navigate into project
git clone <repo_url>
cd basic-car-service-advisor

# 2. Install all dependencies
npm install
npm run install --prefix client
npm run install --prefix server

# 3. Run initial DB migrations
npm run migrate

🚀 Starting the App (Dev Mode)

npm run dev

This will:
	•	Start the client on http://localhost:5173
	•	Start the server on http://localhost:3000

🏗️ Build and Start (Prod)

npm run build      # Builds frontend
npm start          # Starts backend + serves built frontend

🔄 Database Migrations

We use node-pg-migrate.

Run all migrations:

npm run migrate

Create a new migration:

npm run migrate:create -- -m <migration_name>