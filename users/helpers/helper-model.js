const db = require('../../data/dbConfig.js')
const knex = require('knex');

module.exports = {
    find,
    linkTicketToHelper,
    updateTicket  
}

/* 
    Endpoints:

    - READ (GET)
    -- all tickets for a helper -------------- ( find )
    -- all tickets for filter from helper ---- ( findByFilter )

    - UPDATE (PUT)
    -- update a ticket's information --------- ( update )

*/

// ------------------ READ ---------------------------
// grab all tickets associated with a certain helper
function find(helperId){
    return db("tickets as t")
    .join("userTickets as u", "u.ticketId", "t.id")
    .where("helperId", knex.raw('?', [helperId]))
}

// -------------------- UPDATE --------------------------
// add or null the the helperId to the userTickets table
// change the status on tickets
function linkTicketToHelper(ticketId, helperId, link){
    if(link) {
        // link
        return db('userTickets').where({ ticketId }).update({ helperId })    
    } else {
        // unlink
        return db('userTickets').where({ ticketId }).update({ helperId: 0 })
    }
    
}

function updateTicket(id, status){
    return db('tickets').where({id}).update(status)
}