const request = require('supertest')
const server = require('../api/server')
describe('auth endpoints', () => {
    describe('/register endpoint', () => {
        test('register endpoint returns correct response code', () => {
            return request(server).post('/api/auth/register')
            .send({username: 'aUserName', password: 'aPassword'})
            .expect(201)
        })

        test('register endpoint returns new user', async () => {
            const response = await request(server).post('/api/auth/register')
            .send({username: 'aUserName', password: 'aPassword'})

            expect(response.username).toBe('aUserName')
            expect(response.password).toBe('aPassword')
        })
    })
})