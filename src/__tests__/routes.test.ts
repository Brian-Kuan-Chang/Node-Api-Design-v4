import app from '../server'
import supertest from 'supertest';

describe('testing routes',()=>{
    it('should return hello', async function () {
        const res = await supertest(app)
            .get('/')
        expect(res.body.message).toBe('hello')

    });
})