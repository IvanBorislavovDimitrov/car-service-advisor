exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('car_owner', {
        id: 'id',
        first_name: { type: 'varchar(255)', notNull: true },
        last_name: { type: 'varchar(255)', notNull: true },
        email: { type: 'varchar(255)', notNull: true, unique: true },
    });

    pgm.addColumn('car', {
        owner_id: {
            type: 'integer',
            references: '"car_owner"',
            onDelete: 'cascade',
        },
    });
};

exports.down = pgm => {
    pgm.dropColumn('car', 'owner_id');
    pgm.dropTable('car_owner');
};