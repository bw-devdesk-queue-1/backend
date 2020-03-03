const db = require('../../data/dbConfig.js');

module.exports = {
    verifyHelperExists,
    verifyTicketExists,
    verifyHelperTicket
}

function verifyHelperExists(req,res,next) {
    // check to see if Student is in database
    const { helperId } = req.params;
    db('users').where({ id: helperId })
    .then( user => {
        next();
    }) 
    .catch( err => {
        res.status(404).json({errorMessage: 'The student does not exists.'})
    })
}

function verifyTicketExists(req,res,next) {
    // check to see if ticket is in the system
    const { id } = req.params;
    db('tickets').where({ id })
    .then( ticket => {
        next();
    })
    .catch( err => {
        res.status(404).json({errorMessage: 'The ticket does not exists.'})
    })
}

function verifyHelperTicket(req,res,next) {
    // check to see if all properties exists in body
    const ticket = req.body;
    if(!ticket.status) {
        res.status(400).json({errorMessage: 'Please include a status.'})
    } else {
        // make sure body only has status
        req.body = { status: ticket.status };
        next();
    }
}