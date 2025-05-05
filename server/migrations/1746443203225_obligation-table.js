// server/migrations/xxxx-obligation-table.js

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('obligation', {
    id: 'id',
    car_id: {
      type: 'integer',
      notNull: true,
      references: '"car"',
      onDelete: 'cascade',
    },
    name: { type: 'varchar(100)', notNull: true },
    start_date: { type: 'date', notNull: true },
    end_date: { type: 'date' }
  });
};

exports.down = pgm => {
  pgm.dropTable('obligation');
};