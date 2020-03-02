const router = require('express').Router({mergeParams: true});
const Helpers = require('./helper-model.js');
const verifyHelper = require('./verifyHelperRole.js')

router.get('/:helperId', (req, res) => {
    const { helperId } = req.params;
    
    Helper.getHelperTickets(helperId)
    .then( tickets => {
        res.status(200).json(tickets)
    })
    .catch( err => {
        res.tatus(500).json({errorMessage: 'There was an error querying the tickets for this helper'})
    })
})

router.put('/', (req, res) => {
    const changes = req.params;
    Helper.assignHelperId(helper)
})