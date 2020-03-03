
exports.up = function(knex) {
    return knex.schema
      .createTableIfNotExists('users', tbl => {
        tbl.increments();
        tbl.string('username').notNullable();
        tbl.string('password').notNullable();
        tbl.integer('userType').unsigned().notNullable();
      })
      .createTableIfNotExists('tickets', tbl => {
         tbl.increments()
         tbl.string('title', 256).notNullable();
         tbl.string('description', 256).notNullable();
         tbl.string('tried', 256).notNullable();
         tbl.string('category', 256).notNullable();
         tbl.string('status', 256); // Resolved, Pending (its assigned to someone), or Not Assigned (newly created)
      })
      .createTableIfNotExists('userTickets', tbl => {
        tbl.increments()
  
        tbl.integer('studentId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('users')
        
        tbl.integer('ticketId')
          .unsigned()
          .notNullable()
          .references('id')
          .inTable('tickets')
        
        tbl.integer('helperId')
          .unsigned(); //this determines if someone is assigned (don't care about resolved or un-assigned)

        tbl.primary(['studentId', 'ticketId']);
      })
  };
  
  exports.down = function(knex) {
      return knex.schema
      .dropTableIfExists('users')
      .dropTableIfExists('tickets')
      .dropTableIfExists('userTickets')
  };
  