const router = require('express').Router();
const db = require('../../data/dbConfig.js');

//url to be here: /api/categories

router.get('/', (req, res) => {
    // return all of the categories
    res.status(200).json(
        [
            'Git',
            'Express',
            'React',
            'HTML',
            'CSS',
            'General Javascript',
            'General Computer',
            'Other'
        ]
    );
})

module.exports = router;