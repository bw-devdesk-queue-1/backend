const router = require('express').Router({mergeParams: true});
const studentRouter = require('../student/studentRouter.js');
const helperRouter = require('../helper/helperRouter.js');

const Tickets = require('./ticket-model.js');
const verifyStudent = require('../students/verifyStudents.js');
// url to be here: /api/tickets

// setup student and helper routers
router.use('/students', studentRouter);
router.use('/helpers', helperRouter);

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

// helper function to check if object is empty
function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

// get ticket by id
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

//// POST
// create a ticket for a student
router.post('/', verifyStudent, (req, res) => {

    // grab from body
    const { title, description, tried, category, status } = req.body;
    const { id } = req.body; // studentId
    
    // create ticket
    Tickets.insert({ title, description, tried, category, status })
    .then( ticketId => {
        // link to userTickets
        Tickets.linkToStudent(id, ticketId)
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
            await Tickets.remove(ticketId);
            res.status(500).json({ errorMessage: "Ticket was created but not linked, will be deleted."});
        })
    })
    .catch( err => {
        res.status(500).json({ errorMessage: "There was an error creating the ticket."})
    })
});

module.exports = router;