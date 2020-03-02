const router = require('express').Router({mergeParams: true});
const Students = require('./student-model.js');
const verifyStudent = require('./students/verifyStudents.js');
const { verifyStudentExists, verifyTicketExists, verifyTicket } = require('./student-middleware.js');

// url to get here: base-url/api/tickets/:id/students

/*
    Students should be able to:

    CREATE (POST)
    - create a ticket ---------------- via /api/tickets/students/:studentId

    READ (GET)
    - get their all tickets ------------------ via /api/tickets/students/:studentId
    - get query tickets based on params ------ via /api/tickets/students/:studentId

    UPDATE (PUT)
    - update a tickets information ----------- via /api/tickets/:id/students/

    DELETE (DELETE)
    - remove a ticket from the system -------- via /api/tickets/:id/students/
*/

//// POST
// create a ticket for a student
router.post('/:studentId', verifyStudent, verifyStudentExists, verifyTicket, (req, res) => {

    // grab from body
    const { title, description, tried, category, status } = req.body;
    const { id } = req.params; // studentId
    
    // create ticket
    Students.insert({ title, description, tried, category, status })
    .then( ticketId => {
        // link to userTickets
        Students.linkToStudent(id, ticketId)
        .then( userTicketId => {
            //ticket was linked
            res.status(201).json({
                studentId: id,
                ticket: {
                    id: ticketId,
                    title, 
                    description, 
                    tried, 
                    category, 
                    status
                }
            })
        })
        .catch( err => {
            await Students.remove(ticketId);
            res.status(500).json({ errorMessage: "Ticket was created but not linked, will be deleted."});
        })
    })
    .catch( err => {
        res.status(500).json({ errorMessage: "There was an error creating the ticket."})
    })
});

//// GET
// retrieve all tickets or with queries
router.get('/:studentId', verifyStudentExists, (req, res) => {
    
    const { studentId } = req.params;
    const isQuery = isEmpty(req.query);

    if(isQuery) {

        // grab all queries
        const queries = req.query;
        Students.findByFilter(studentId, queries)
        .then( tickets => {
            res.status(200).json(tickets);
        })
        .catch( err => {
            res.status(500).json({errorMessage: 'There was an error querying the tickets.'})
        })

    } else {
        
        Students.find(studentId)
        .then(tickets => {
            res.status(200).json(tickets)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to retrieve the tickets"})
        })

    }
})

//// PUT
// update a ticket
router.put('/', verifyStudentExists, verifyTicketExists, verifyTicket, (req,res) => {
    // grab the ticket id and changes
    const { id } = req.params;
    const changes = req.body;

    // update the ticket
    Students.update(id, changes)
    .then( ticket => {
        res.status(200).json(ticket);
    })
    .catch( err => {
        res.status(500).json({errorMessage: 'There was an error updating the ticket.'});
    })
})

//// DELETE
// remove a ticket from the system
router.delete('/', (req,res) => {
    // grab the ticket id
    const { id } = req.params;

    //remove the ticket
    Students.remove(id)
    .then( success => {
        if(success) {
            res.status(200).json({message: 'Ticket removed from the system.'})
        } else {
            res.status(400).json({message: 'Ticket was not in the system'})
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: 'There was an error deleting the ticket.'})
    })
})

module.exports = router;