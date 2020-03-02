const router = require('express').Router({mergeParams: true});
const Students = require('./student-model.js');

// url to get here: base-url/api/tickets/:id/students

// base-url/api/tickets/:id/students

// server.use('/api/tickets')

// ticketsRouter.use('/students')
//// const ticketId = req.params.id;



//retrieve all tickets created by a student
router.get('/student/:id', (req, res) => {
    const {id} = req.params

    //check to see if there are query parameters
    const queryExists = req.query
    //if not then just grab all

    //else grab queries and filter
    Students.findByStudentId(id)
    .then(tickets => {
        res.status(200).json(tickets)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Unable to retrieve the tickets"})
    })
})

//retrieve all tickets under a certain filter
router.get('/student/:id', (req, res) => {
    Students.findTicketByFilter()
    .then(tickets => {
        res.status(200).json(tickets)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error: "Unable to retrieve the tickets"})
    })
})

module.exports = router;