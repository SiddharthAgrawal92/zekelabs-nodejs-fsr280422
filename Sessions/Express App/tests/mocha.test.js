const assert = require('assert');
const { expect } = require('chai');

describe('Parent Describe', () => {
    console.log('Parent Describe');
    // hooks
    before(() => {
        //before all tests
        console.log('*** before ***');
    });
    beforeEach(() => {
        //before each test
        console.log('*** beforeEach ***');
    });
    afterEach(() => {
        //after each test
        console.log('*** afterEach ***');
    });
    after(() => {
        //after all tests
        console.log('*** after ***');
    });

    const arr = [1, 2, 3, 4, 5];

    describe('Nested Describe', () => {
        console.log('1st Nested Describe');
        it('should be an array', () => {
            console.log('1st test case');
            expect(arr).to.be.an('array');
        });
    });

    it('should contain value 5', () => {
        console.log('2nd test case');
        expect(arr).that.includes(5);
    });

    it('should return an index -1', () => {
        console.log('3rd test case');
        assert.equal(arr.indexOf(6), -1)
    })

})