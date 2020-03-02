const router = require('express').Router({mergeParams: true});
const studentRouter = require('../students/studentRouter.js');
const helperRouter = require('../helpers/helperRouter.js');

const verifyStudentRole = require('../students/verifyStudentRole.js');

const Tickets = require('./ticket-model.js');

const isEmpty = require('../../utils/isEmpty.js');

// url to be here: /api/tickets?status=Un-Assigned

// setup student and helper routers
router.use('/students', verifyStudentRole, studentRouter);
// router.use('/helpers', helperRouter);

//// GET
// get all tickets or by query
router.get('/', (req, res) => {

    // check to see if there is a query string
    const isQuery = isEmpty(req.query);

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

        Tickets.find()
        .then(tickets => {
            res.status(200).json(tickets)
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
        res.status(200).json(ticket)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Unable to retrieve the ticket"})
    })
})

// instead of /api/tickets/ to create
// we would have: /api/tickets/students/:studentId <-- where we create ticket

module.exports = router;