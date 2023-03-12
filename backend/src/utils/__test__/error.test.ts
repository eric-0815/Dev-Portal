import { createErrorMsg } from '../error';

describe('createErrorMsg', () => {
    it('should return an object with a single error message', () => {
        const errorMsg = 'This is an error message.';
        const result = createErrorMsg(errorMsg);
        expect(result).toHaveProperty('errors');
        expect(result.errors).toHaveLength(1);
        expect(result.errors[0]).toHaveProperty('msg', errorMsg);
    });
});
