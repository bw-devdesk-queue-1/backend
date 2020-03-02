
exports.up = function(knex) {
  return knex.schema
    .createTable('tickets', tbl => {
       tbl.increments()
       tbl.string('title', 256).notNullable();
       tbl.string('description', 256).notNullable();
       tbl.string('tried', 256).notNullable();
       tbl.string('category', 256).notNullable();
       tbl.boolean('resolved', 256).notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tickets')
};
