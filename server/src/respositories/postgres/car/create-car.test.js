import { PostgresCreateCarRepository } from './create-car.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('PostgresCreateCarRepository', () => {
    const sut = new PostgresCreateCarRepository();

    test('should create a car sucessfully', async () => {
        await prisma.user.create({ data: user });
        const result = await sut.execute({ ...car, user_id: user.id });

        expect(result).not.toBeFalsy();
    });

    test('should return a car with correct properties', async () => {
        await prisma.user.create({ data: user });
        const result = await sut.execute({ ...car, user_id: user.id });

        expect(result).toStrictEqual({
            id: car.id,
            user_id: user.id,
            brand: car.brand,
            name: car.name,
            year: car.year,
            plate: car.plate,
            expenses: 0,
            entry_price: car.entry_price,
        });
    });
});