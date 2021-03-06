
exports.up = function(knex) {
    return knex.schema
    .createTableIfNotExists('users', tbl => {
      tbl.increments();
      tbl.string('username').notNullable();
      tbl.string('password').notNullable();
      tbl.string('userType').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
