const db = require('../../data/dbConfig.js')
const knex = require('knex');

module.exports = {
    insert,
    linkToStudent,
    find,
    findByFilter,
    update,
    remove
}

/* 
    Endpoints:

    - CREATE (POST)
    -- create a ticket ----------------------- ( insert )
    -- link a ticket to a student ------------ ( linkToStudent )

    - READ (GET)
    -- all tickets for a student ------------- ( find )
    -- all tickets for filter from student --- ( findByFilter )

    - UPDATE (PUT)
    -- update a ticket's information --------- ( update )
    
    - DELETE (DELETE)
    -- delete a ticket ----------------------- ( remove )
*/


// ---------------- CREATE ----------------

// create a ticket
function insert(ticket) {
    return db('tickets').insert(ticket);
}

// link ticket to student
function linkToStudent(studentId, ticketId) {
    return db('userTickets').insert({studentId: studentId, ticketId: ticketId, helperId: 0});
}


// ---------------- READ ----------------

// grab all tickets for a student
function find(studentid) {
    return db("tickets as t")
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