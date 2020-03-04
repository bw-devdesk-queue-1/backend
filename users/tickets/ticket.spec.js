const request = require('supertest');
const server = require('../api/server.js')
const db = require('../../data/dbConfig.js');

describe('Grab all tickets in the system', () => {
    it('should return a status of 200', async () => {
        const expectedStatusCode = 200;
            
        const response = await request(server)
        .get('/api/tickets/')
        
        expect(response.status).toBe(expectedStatusCode)
    });

    it('should have the correct return object', async () => {
        
        const response = await request(server)
        .get('/api/tickets/')

        expect(res.body[0]).toHaveProperty('studentId')
        expect(res.body[0]).toHaveProperty('helperId')
        expect(res.body[0]).toHaveProperty('ticket')
        expect(res.body[0].ticket).toHaveProperty('id')
        expect(res.body[0].ticket).toHaveProperty('title')
        expect(res.body[0].ticket).toHaveProperty('description')
        expect(res.body[0].ticket).toHaveProperty('tried')
        expect(res.body[0].ticket).toHaveProperty('category')
        expect(res.body[0].ticket).toHaveProperty('status')
    })
})

describe('Grab a specific ticket fom the system', async () => {
    
    let idToTest = 0;
    
    beforeEach( async () => {
        let ticketId;
        // create the test ticket
        await db('tickets').insert({title: 'Test', description: 'description', tried: 'tried', category: 'category', status: 'Resolved'})
        .then( id => {
            ticketId = id;
        })

        let studentId;
        // create the test student
        await db('users').insert({username: 'Test', password: 'testpass', userType: 0})
        .then( id => {
           studentId = id; 
        })
        let helperId;
        // create the test helper
        await db('users').insert({username: 'TestHelper', password: 'testpass', userType: 1})
        .then( id => {
            helperId = id;
        })

        // link the student to the ticket and helper as well
        await db('userTickets').insert({studentId, ticketId, helperId})

    })
    it('should return a status of 200', async () => {
        const expectedStatusCode = 200;
            
        const response = await request(server)
        .get('/api/tickets/1')
        
        expect(response.status).toBe(expectedStatusCode)
    });

    it('should have the correct return object', async () => {
        
        const response = await request(server)
        .get('/api/tickets/1')

        expect(res.body[0]).toHaveProperty('studentId')
        expect(res.body[0]).toHaveProperty('helperId')
        expect(res.body[0]).toHaveProperty('ticket')
        expect(res.body[0].ticket).toHaveProperty('id')
        expect(res.body[0].ticket).toHaveProperty('title')
        expect(res.body[0].ticket).toHaveProperty('description')
        expect(res.body[0].ticket).toHaveProperty('tried')
        expect(res.body[0].ticket).toHaveProperty('category')
        expect(res.body[0].ticket).toHaveProperty('status')
    })
})