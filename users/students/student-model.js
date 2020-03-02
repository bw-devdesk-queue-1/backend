const db = require('../../data/dbConfig.js')
module.exports = {
    find,
    findById,
    add,
    update,
    remove,
    findBy,
    findByStudentId
}

/* 
    Endpoints:

    - CREATE (POST)
    -- create a ticket ----------------------- ( insert )
    -- link student to ticket ---------------- ( linkToStudent )

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

// ---------------- CREATE ----------------

// create a ticket
function insert(studentId, ticket) {
    return db('tickets').insert(ticket);
}

// link ticket to student
function linkToStudent(studentId, ticketId) {
    return db('userTickets').insert({studentId, ticketId});
}

// ---------------- READ ----------------

// grab all tickets
function find(){
    return db('tickets')
}

// grab a specific ticket for anyone
function findById(id) {
    return db('tickets')
    .where({id})
    .first()
}

// grab all tickets for a student
function findByStudentId(studentid) {
    return db("tickets a t")
    .join("userTickets as u", "u.ticketId", "t.id")
    .where("studentId", studentid)
}

// find a ticket from a given property
function findTicketsByFilter(filter) {
    return db('tickets')
      .where(filter);
}

// find all tickets for student by filter
function findStudentTicketsByFilter(id, filter) {
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