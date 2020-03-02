const db = require('../../data/dbConfig.js');

module.exports = {
    verifyStudentExists,
    verifyTicketExists,
    verifyTicket
}

function verifyStudentExists(req,res,next) {
    // check to see if Student is in database
    const { studentId } = req.params;
    db('users').where({ id: studentId })
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

function verifyTicket(res,req,next) {
    // check to see if all properties exists in body
    const ticket = req.body;
    if(
        !ticket.title ||
        !ticket.description ||
        !ticket.tried ||
        !ticket.category
    ) {
        res.status(400).json({errorMessage: 'Please include a title, description, tried, and category.'})
    } else {
        next();
    }
}