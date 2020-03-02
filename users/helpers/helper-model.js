const db = require('../../data/dbConfig.js')

module.exports = {
    getHelperTickets,
    assignHelperId,
    assignStatus  
}
// ------------------ READ ---------------------------
// grab all tickets associated with a certain helper
function getHelperTickets(helperid){
    return db("tickets as t")
    .join("userTickets as u", "u.ticketId", "t.id")
    .where("helperId", helperid)
}




// -------------------- UPDATE --------------------------
// add or null the the helperId to the userTickets table
// change the status on tickets
function assignHelperId(id, helperId){
    return db('userTickets').where({ id }).update(helperId)
}

function assignStatus(id, status){
    return db('tickets').where({id}).update(status)
}