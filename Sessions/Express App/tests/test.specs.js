// test('multiply-two-numbers', () => {
//     const value = 2 * 3;
//     expect(value).toEqual(6);
//     expect(value).toBeGreaterThan(5);
// });

// test('sum-of-two-numbers', () => {
//     const value = 1 + 2;
//     expect(value).toEqual(3);
//     expect(value).toBeGreaterThan(2);
//     expect(value).toBeGreaterThanOrEqual(3);
//     expect(value).toBeLessThan(4);
//     expect(value).toBeLessThanOrEqual(3);
// });

// test('for null/falsy/undefined values', () => {
//     value = '';
//     // expect(value).toBeNull(); //null
//     // expect(value).not.toBeNull(); //not null
//     // expect(value).toBeUndefined(); //undefined
//     // expect(value).not.toBeUndefined(); //not undefined
//     expect(value).toBeTruthy(); //not undefined/null/false/''/0
//     // expect(value).not.toBeTruthy(); //undefined/null/false/''/0
//     // expect(value).toBeFalsy(); //undefined/null/false/''/0
//     // expect(value).not.toBeFalsy(); //not undefined/null/false/''/0
// });

// test('for floating values', () => {
//     let value = 0.1 + 0.2; // res=0.30000000000000004 is not equal to 0.3 decimal.js to get the to precision value
//     value = 0.2 + 0.2;
//     expect(value).toBeCloseTo(0.4);
// })

// test('for array values', () => {
//     let list = new Set(['Siddharth', 'Software', 'Software', 'Company', 'Edyoda']);
//     let value = 'Software';
//     expect(list).toContain(value);
// });

// const getModule = () => { throw new Error('module not found'); }

// test('for module fetch', () => {
//     // expect(() => getModule()).toThrow(Error); // it module fetch fails
//     // expect(() => getModule()).toThrow();
//     expect(() => getModule()).toThrow('module not found'); // it only works when string passed in toThrow() is similar to the thrown value 
// });

// const getAsyncData = async () => 'Hello World';

// test('for async-await ops', async () => {
//     // const data = await getAsyncData();
//     // expect(data).toBe('Hello World');

//     //combination of above two lines
//     await expect(getAsyncData()).resolves.toBe('Hello World');
// });

const getCallbackData = (cb) => {
    return cb(null, 'data from getCallbackData()'); // without an error
    // return cb('Error: callback with error', 'data from getCallbackData()'); // with an error
}

test('for callback ops', () => {
    const callback = (err, data) => {
        expect(err).toBeNull();
        expect(data).toBe('data from getCallbackData()');
    }
    getCallbackData(callback);
});