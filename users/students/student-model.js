const db = require('../../data/dbConfig.js')

module.exports = {
    update,
    remove,
    findByStudentId,
    findByFilter  
}

/* 
    Endpoints:

    - READ (GET)
    -- all the tickets in the system --------- ( find )
    -- a specific ticket --------------------- ( findBy )
    -- all tickets for a student ------------- ( findByStudentId )
    -- all tickets for filter just ticket ---- ( findTicketsByFilter )
    -- all tickets for filter from student --- ( findStudentTicketsByFilter )

    - UPDATE (PUT)
    -- update a ticket's information --------- ( update )
    
    - DELETE (DELETE)
    -- delete a ticket ----------------------- ( remove )
*/


// ---------------- READ ----------------

// grab all tickets for a student
function findByStudentId(studentid) {
    return db("tickets a t")
    .join("userTickets as u", "u.ticketId", "t.id")
    .where("studentId", studentid)
}



// find all tickets for student by filter
function findByFilter(id, filter) {
    return db("tickets a t")
    .join("userTickets as u", 'u.studentId', knex.raw('?', [id]))
    .where(filter)
}


// ---------------- UPDATE ----------------

// update the ticket with ticket id and changes to be made
function update(id, changes) {
    return db('tickets').where({ id }).update(changes);
}


// ---------------- DELETE ----------------

// remove ticket from database
function remove(id) {
    return db('tickets').where({ id }).del();
}