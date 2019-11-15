const request = require('supertest')
const server = require('./server')

describe('Server.js', () => {
    describe('Base URL things', () => {
        test('Base URL responds with status OK', () => {
            return request(server).get('/')
            .expect(200)
        })

        test('Server returns correct body', () => {
            return request(server).get('/')
            .expect(200)
            .expect({api: 'le up'})
        })
    })
})