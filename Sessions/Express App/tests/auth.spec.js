const verifyToken = require('../src/middleware/verifyToken');
const jwt = require('jsonwebtoken');
require('dotenv').config();

describe('for authorization', () => {
    let mockRequest;
    let mockResponse;
    let mockNext = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        }
    })

    test('without access_token in request cookies', () => {
        const expectedResponse = {
            error: "Token is required"
        }
        verifyToken(mockRequest, mockResponse, mockNext);
        expect(mockResponse.json).toBeCalledWith(expectedResponse);
    });

    test('with access_token in request cookies', () => {
        const token = jwt.sign({ iss: 'testing' }, process.env.JWT_TOKEN_KEY, {
            algorithm: 'HS256',
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN
        });
        console.log(token);
        mockRequest = {
            cookies: {
                access_token: token
            }
        }
        verifyToken(mockRequest, mockResponse, mockNext);
        expect(mockNext).toBeCalledTimes(1);
    });
})