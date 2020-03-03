const router = require('express').Router({mergeParams: true});
const Students = require('./student-model.js');
const { verifyStudentExists, verifyTicketExists, verifyTicket } = require('./student-middleware.js');
const isEmpty = require('../../utils/isEmpty.js');

// url to get here: base-url/api/tickets/:id/students
// url to get here: base-url/api/tickets/students/:id

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
router.post('/:studentId', verifyStudentExists, verifyTicket, (req, res) => {

    // grab from body
    const { title, description, tried, category } = req.body;
    const { studentId } = req.params; // studentId
    
    // create ticket
    Students.insert({ title, description, tried, category })
    .then( ticketId => {
        // link to userTickets
        console.log('linking', studentId, ticketId[0])
        Students.linkToStudent(studentId, ticketId[0])
        .then( userTicketId => {
            //ticket was linked
            res.status(201).json({
                studentId: Number(studentId),
                ticket: {
                    id: ticketId[0],
                    title, 
                    description, 
                    tried, 
                    category, 
                    status: 'Un-assigned'
                }
            })
        })
        .catch( err => {
            // await Students.remove(ticketId[0]);
            console.log(err);
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
    const isQuery = !isEmpty(req.query);
    // console.log(isQuery);

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
            //format
            const newTickets = tickets.map( ticket => {
                return {
                    studentId: ticket.studentId,
                    helperId: ticket.helperId,
                    ticket: {
                        id: ticket.id,
                        title: ticket.title,
                        description: ticket.description,
                        tried: ticket.tried,
                        category: ticket.category,
                        status: ticket.status
                    }
                }
            })
            res.status(200).json(newTickets)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "Unable to retrieve the tickets"})
        })

    }
})

//// PUT
// update a ticket
router.put('/', verifyTicketExists, verifyTicket, (req,res) => {
    // grab the ticket id and changes
    const changes = req.body;
    console.log(req.params);
    // update the ticket
    Students.update(changes.id, changes)
    .then( success => {
        if(success) {
            res.status(200).json({...changes});
        } else {
            res.status(500).json({errorMessage: 'There was an error updating the ticket.'})
        }
        
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