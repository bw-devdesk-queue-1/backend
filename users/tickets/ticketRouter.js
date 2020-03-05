const router = require('express').Router();
const studentRouter = require('../students/studentRouter.js');
const helperRouter = require('../helpers/helperRouter.js');

const Tickets = require('./ticket-model.js');
const Users = require('../user-model.js');

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
            Users.find()
            .then( users => {
                // match users to their tickets
                // console.log('users', users);
                // console.log('tickets', tickets);
                const newTickets = tickets.map( ticket => {
                    const student = getUser(ticket.studentId, users);
                    const helper = getUser(ticket.helperId, users);
                    
                    function getUser(id, list) {
                        // iterate through list and return list item with matching id
                        let item = list.filter( item => { return id === item.id });
                        if(item.length === 0) {
                            // console.log('setting item to blank')
                            return {
                                id: 0,
                                username: ""
                            }
                        } 
                        return item[0];
                    }
                    
                    return {
                        student: {
                            id: student.id,
                            username: student.username        
                        },
                        helper: {
                            id: helper.id,
                            username: helper.username
                        },
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
            });
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