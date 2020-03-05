const request = require('supertest')
const db = require('../../data/dbConfig.js')
const student
const server = require('../../api/server.js')

describe('testing the add function on the database', () => {
    beforeEach(async () => {
        await db('users').truncate();
    });

    describe('add function', () => {
        it('add new users into the db', async () => {
            let userNumber;
            userNumber = await db('users'
            await auth.add({ username: 'Harry', password: 'potter', userType: '0'})
            await auth.add({ username: 'Ron', password: 'weasley', userType: '1'})
            await auth.add({ username: 'Hermoine', password: 'granger', userType: '0'})
            userNumber = await db('users');
            expect(userNumber).toHaveLength(3)
        });
    });
});
