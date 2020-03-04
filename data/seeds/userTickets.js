exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('userTickets').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('userTickets').insert([
          {studentId: 10, ticketId: 1},
          {studentId: 3, ticketId: 2},
          {studentId: 3, ticketId: 3},
          {studentId: 6, ticketId: 4},
          {studentId: 3, ticketId: 5},
          {studentId: 5, ticketId: 6},
          {studentId: 3, ticketId: 7},
        ]);
      });
  };
