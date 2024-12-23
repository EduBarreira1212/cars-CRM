import request from 'supertest';
import { app } from '../app.js';

import { carFixture } from '../tests/fixtures/car.js';
import { userFixture } from '../tests/fixtures/user.js';
import { sellFixture } from '../tests/fixtures/sell.js';
import { leadFixture } from '../tests/fixtures/lead.js';
import { faker } from '@faker-js/faker';
import clerkClient from '../../clerk/clerk.js';

describe('Sell Routes E2E Tests', () => {
    test('POST /api/sells', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: leadCreated } = await request(app)
            .post('/api/leads')
            .send({
                ...leadFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const response = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                lead_id: leadCreated.id,
                id: undefined,
            });

        expect(response.status).toBe(201);
        expect(response.body.id).toBeTruthy();

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('GET /api/sells/:sellId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: leadCreated } = await request(app)
            .post('/api/leads')
            .send({
                ...leadFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                lead_id: leadCreated.id,
                id: undefined,
            });

        const response = await request(app).get(`/api/sells/${sellCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(sellCreated);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('GET /api/sells/', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: leadCreated } = await request(app)
            .post('/api/leads')
            .send({
                ...leadFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated1 } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                lead_id: leadCreated.id,
                id: undefined,
            });

        const response = await request(app).get(
            `/api/sells/?userId=${userCreated.id}`
        );

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual([sellCreated1]);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('PATCH /api/sells/:sellId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: leadCreated } = await request(app)
            .post('/api/leads')
            .send({
                ...leadFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                lead_id: leadCreated.id,
                id: undefined,
            });

        const response = await request(app)
            .patch(`/api/sells/${sellCreated.id}`)
            .send({
                amount: Number(faker.commerce.price({ min: 20000, max: 1000000 })),
                profit: Number(faker.commerce.price({ min: 1000, max: 100000 })),
            });

        expect(response.status).toBe(200);
        expect(response.body).not.toStrictEqual(sellCreated);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });

    test('DELETE /api/sells/:sellId', async () => {
        const { body: userCreated } = await request(app)
            .post('/api/users')
            .send({
                ...userFixture,
                email: `${faker.person.firstName()}+clerk_test@gmail.com`,
                id: undefined,
            });

        const { body: carCreated } = await request(app)
            .post('/api/cars')
            .send({
                ...carFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: leadCreated } = await request(app)
            .post('/api/leads')
            .send({
                ...leadFixture,
                user_id: userCreated.id,
                id: undefined,
            });

        const { body: sellCreated } = await request(app)
            .post('/api/sells')
            .send({
                ...sellFixture,
                user_id: userCreated.id,
                car_id: carCreated.id,
                lead_id: leadCreated.id,
                id: undefined,
            });

        const response = await request(app).delete(`/api/sells/${sellCreated.id}`);

        expect(response.status).toBe(200);
        expect(response.body).toStrictEqual(sellCreated);

        await clerkClient.users.deleteUser(userCreated.external_id);
    });
});
