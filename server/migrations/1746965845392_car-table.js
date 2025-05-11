exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('car', {
    id: 'id',
    brand: { type: 'varchar(100)', notNull: true },
    model: { type: 'varchar(100)', notNull: true },
    vin: { type: 'varchar(100)', notNull: true },
    mileage: { type: 'integer' }
  });
};

exports.down = pgm => {
  pgm.dropTable('car');
};