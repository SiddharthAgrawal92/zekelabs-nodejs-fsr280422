const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/server');
const jwt = require('jsonwebtoken');

//chai assertion styles
chai.should();

//make chai assertion use of chai-http 
chai.use(chaiHttp);

describe('API /posts Module', () => {
    it('should get all posts', done => {
        const token = jwt.sign({ iss: 'testing' }, process.env.JWT_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
        });
        chai.request(server).get('/posts').set('Cookie', `access_token=${token}`).end((err, response) => {
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.postsList.should.be.a('array');
            done();
        })
    });
})