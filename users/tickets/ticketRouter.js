const router = require('express').Router();
const studentRouter = require('../students/studentRouter.js');
const helperRouter = require('../helpers/helperRouter.js');

const Tickets = require('./ticket-model.js');

const isEmpty = require('../../utils/isEmpty.js');

// url to be here: /api/tickets?status=Un-Assigned

// setup student and helper routers
router.use('/:id/students', studentRouter);
router.use('/students', studentRouter);

router.use('/helpers', helperRouter);
router.use('/:id/helpers', helperRouter);

//// GET
// get all tickets or by query
// url /api/tickets/
router.get('/', (req, res) => {

    // check to see if there is a query string
    const isQuery = !isEmpty(req.query);
    if(isQuery) {

        // grab all queries
        const queries = req.query;
        Tickets.findByFilter(queries)
        .then( tickets => {
            res.status(200).json(tickets);
        })
        .catch( err => {
            res.status(500).json({errorMessage: 'There was an error querying the tickets.'})
        })

    } else {

        Tickets.findAll()
        .then(tickets => {
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

// get ticket by id
// url /api/tickets/:id
router.get('/:id', (req, res) => {
    const {id} = req.params;
    
    Tickets.findById(id)
    .then(ticket => {
        if(ticket !== undefined) {
            res.status(200).json(ticket)
        } else {
            res.status(404).json({message: 'Ticket was not in the system.'})
        }
        
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Unable to retrieve the ticket"})
    })
})

module.exports = router;