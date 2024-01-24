//database/adopters.test.js
const adopters = require('./adopters');

describe('adopters data', () => {
    test('should be an array', () => {
        expect(Array.isArray(adopters)).toBe(true);
    });

    test('each adopter should have id, name, and address properties', () => {
        adopters.forEach(adopter => {
            expect(adopter).toHaveProperty('id');
            expect(adopter).toHaveProperty('name');
            expect(adopter).toHaveProperty('address');
        });
    });

    test('adopter id should be a number', () => {
        adopters.forEach(adopter => {
            expect(typeof adopter.id).toBe('number');
        });
    });

    test('adopter name and address should be a string', () => {
        adopters.forEach(adopter => {
            expect(typeof adopter.name).toBe('string');
            expect(typeof adopter.address).toBe('string');
        });
    });
});