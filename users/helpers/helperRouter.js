const router = require('express').Router({mergeParams: true});
const Helpers = require('./helper-model.js');
const verifyHelperRole = require('./verifyHelperRole.js')
const { verifyHelperExists, verifyTicketExists, verifyHelperTicket } = require('./helper-middleware.js');
const isEmpty = require('../../utils/isEmpty.js');

// url to get here: base-url/api/tickets/:id/helpers
// url to get here: base-url/api/tickets/helpers/:id

/*
    Helpers should be able to:

    READ (GET)
    - get their all tickets ------------------ via /api/tickets/helpers/:helperId
    - get query tickets based on params ------ via /api/tickets/helpers/:helperId

    UPDATE (PUT)
    - update a tickets information ----------- via /api/tickets/:id/helpers/

*/

//// GET
// get all their tickets and query if exists
// url /api/tickets/helpers/:helperId
router.get('/:helperId', verifyHelperRole, verifyHelperExists, (req, res) => {
    const { helperId } = req.params;
    const isQuery = !isEmpty(req.query);
    // console.log(isQuery);

    if(isQuery) {

        // grab all queries
        // const queries = req.query;
        // Helpers.findByFilter(studentId, queries)
        // .then( tickets => {
        //     res.status(200).json(tickets);
        // })
        // .catch( err => {
            res.status(500).json({errorMessage: 'There was an error querying the tickets.'})
        // })

    } else {
        
        Helpers.find(helperId)
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
            // console.log(err)
            res.status(500).json({error: "Unable to retrieve the tickets"})
        })

    }
});

//// PUT
// update a ticket's information
// url /api/tickets/:id/helpers/:helperId
router.put('/:helperId', verifyHelperRole, verifyTicketExists, verifyHelperTicket, verifyHelperExists, (req, res) => {
    const { id, helperId } = req.params;
    const ticket = req.body;
    Helpers.updateTicket(id, ticket)
    .then( success => {
        if(success) {
            // is the status resolved or un-assigned
            const link = ticket.status === 'Pending';
            
            Helpers.linkTicketToHelper(id, helperId, link)
            .then( id => {
                res.status(200).json({message: 'Ticket was updated and linked appropriately.'})
            })
            .catch( err => {
                res.status(500).json({errorMessage: 'The ticket could not be linked appropriately.'})
            })
        } else {
            res.status(500).json({message: 'The ticket was not updated.'})
        }
    })
    .catch( err => {
        res.status(500).json({errorMessage: 'There was an error updating the ticket.'})
    })
})

module.exports = router;