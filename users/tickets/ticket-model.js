const db = require('../../data/dbConfig.js');
const knex = require('knex');

module.exports = {
    find, 
    findById,
    findByFilter,
    findAll
}

// grab all tickets
function find(){
    return db('tickets')
}

// grab a specific ticket for anyone
function findById(id) {
    return db("tickets as t")
        .join("userTickets as u", "u.ticketId", knex.raw("?",[id]))
    .first()
}

// find a ticket from a given property
function findByFilter(filter) {
    return db('tickets')
      .where(filter);
}

// get all tickets with student information
function findAll() {
    return db("tickets as t")
        .join("userTickets as u", "u.ticketId", "t.id")
}