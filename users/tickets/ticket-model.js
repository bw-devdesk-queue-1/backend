const db = require('../../data/dbConfig.js');

module.exports = {
    find, 
    findById,
    findByFilter,
    insert,
    linkToStudent,
    remove
}

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

// create a ticket
function insert(studentId, ticket) {
    return db('tickets').insert(ticket);
}

// link ticket to student
function linkToStudent(studentId, ticketId) {
    return db('userTickets').insert({studentId, ticketId});
}

// find a ticket from a given property
function findByFilter(filter) {
    return db('tickets')
      .where(filter);
}

//remove ticket (only used when error linking ticket)
function remove(id) {
    return db('tickets')
        .where({ id })
        .del();
}