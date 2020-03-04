const request = require('supertest');
const server = require('../api/server.js')


describe('Get tickets without a token', () => { //checks the authenticate middleware by trying to log in without a token
    it('should return a 401', () => {
        return request(server).get('/api/tickets')
        .expect(401)
        .then( res => {
            expect(res.body).toStrictEqual({"message": "you do not have access to this data"})
        })
    });
});

describe('register', function() { //tests register by signing up a new user
    it('has the ability to register a new student', function() {
        return request(server)
        .post('/api/auth/register')
        .send({ username: 'Aaron', password: 'Rodgers', userType: '0'})
        .expect(201)
        .then( res => {
            expect(res.type).toMatch(/json/)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('userType')
        });
    });

    it('has the ability to register a new helper', function() {
        return request(server)
        .post('/api/auth/register')
        .send({ username: 'Tom', password: 'Brady', userType: '1'})
        .expect(201)
        .then( res => {
            expect(res.type).toMatch(/json/)
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            expect(res.body).toHaveProperty('userType')
        });
    });
});

describe('new login student', function() {//test register by signing in with the user created in the last test
    let token;
    let studentId;
    it('student has the ability to login with a recently made account', function() {
        return request(server)
        .post('/api/auth/login')
        .send({ username: 'Aaron', password: 'Rodgers'})
        .expect(200)
        .then( res => {
            expect(res.type).toMatch(/json/)
            expect(res.body).toHaveProperty('token')
            expect(res.body).toHaveProperty('id')
            expect(res.body).toHaveProperty('username')
            token = res.body.token
            studentId = res.body.studentId
        });
    });

    it('student can access tickets with a token', function() {
        return request(server)
        .get('/api/tickets')
        .set("Authorization", token)
        .expect(200)
        .then( response => {
            expect(Array.isArray(response.body)).toBe(true)
            expect(response.body).toHaveLength(14)
        })
    })

    it('student can create a ticket', function() {
        return request(server)
        .post(`api/tickets/students/${studentId}`)
        .set("Authorization", token)
        .send({title: "I'm trying to create a custom hook but am having trouble", description: "I'm getting an error when i try to run my custom hook", tried: "I've been reading documentation", category: "React"})
        .expect(201)
        .then( response => {
            expect(response.type).toMatch(/json/)
            expect(response.type).toHaveProperty(title)
            expect(response.type).toHaveProperty(description)
            expect(response.type).toHaveProperty(tried)
            expect(response.type).toHaveProperty(category)
        })
    })

    it('student can access categories', function() {
        return request(server)
        .get(`api/categories`)
        .set("Authorization", token)
        .expect(200)
        .then( response => {
            expect(Array.isArray(response.body)).toBe(true)
        })

    })

});

// describe('new login helper', function() {//test register by signing in with the user created in the last test
//     let token;
//     let helperId;
//     it('helper has the ability to login with a recently made account', function() {
//         return request(server)
//         .post('/api/auth/login')
//         .send({ username: 'Tom', password: 'Brady'})
//         .expect(200)
//         .then( res => {
//             expect(res.type).toMatch(/json/)
//             token = res.body.token
//             helperId = res.body.helperId
//         });
//     });

//     it('helper can access tickets with a token', function() {
//         return request(server)
//         .get('/api/tickets')
//         .set("Authorization", token)
//         .expect(200)
//         .then( response => {
//             expect(Array.isArray(response.body)).toBe(true)
//             expect(response.body).toHaveLength(14)
//         })
//     })

//     it('helper can claim a ticket', function() {
//         return request(server)
//         .put(`api/tickets/3/helpers/${helperId}`)
//         .set("Authorization", token)
//         .send({status: "Pending"})
//         .expect(201)
//         .then( response => {
//             expect(response.type).toMatch(/json/)
//             expect(response.type).toHaveProperty(title)
//             expect(response.type).toHaveProperty(message)
//         })
//     })

//     it('helper can access categories', function() {
//         return request(server)
//         .get(`api/categories`)
//         .set("Authorization", token)
//         .expect(200)
//         .then( response => {
//             expect(Array.isArray(response.body)).toBe(true)
//         })

//     })

// });

