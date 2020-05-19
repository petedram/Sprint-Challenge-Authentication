const request = require('supertest');
const server = require('../api/server');
const db = require('../database/dbConfig')


describe('server', () => {
    it('should set the testing environment', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })
})


describe('POST /register', function() {
    it('checks register res 201', function() {
      return request(server)
        .post('/api/auth/register')
        .send({username: 'john', password: 'secretpassword'})
        .then(res => {
            expect(res.status).toBe(201)
        });
    })
    it('checks returns json', function() {
        return request(server)
        .post('/api/auth/register')
        .send({username: 'john', password: 'secretpassword'})
        .set('Accept', 'application/json')
        .then(res => {
            // expect(res.status).toBe(201)
            expect(res.type).toBe('application/json')
        });
    })

    beforeEach(async () => {
        await db('users').truncate();
    })

    afterEach(async () => {
        await db('users').truncate();
    })
  });


  describe('POST /login', function() {
    it('registers in prep for login', function() {
        return request(server)
          .post('/api/auth/register')
          .send({username: 'john', password: 'secretpassword'})
          .then(res => {
              expect(res.status).toBe(201)
          })
      });
  
    it('checks login 200', function() {
      return request(server)
        .post('/api/auth/login')
        .send({username: 'john', password: 'secretpassword'})
        .then(res => {
            expect(res.status).toBe(200)
        })
    });
    it('checks returns json on login', function() {
        return request(server)
        .post('/api/auth/login')
        .send({username: 'john', password: 'secretpassword'})
        .then(res => {
            expect(res.type).toBe('application/json')
        });
    })

  });




