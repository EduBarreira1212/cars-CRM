import { PostgresUpdateCarRepository } from './update-car.js';
import { userFixture as user } from '../../../tests/fixtures/user.js';
import { carFixture as car } from '../../../tests/fixtures/car.js';

import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

describe('PostgresUpdateCarRepository', () => {
    const sut = new PostgresUpdateCarRepository();

    test('should update a car sucessfully', async () => {
        await prisma.user.create({ data: user });
        await prisma.car.create({ data: { ...car, user_id: user.id } });

        const result = await sut.execute(car.id, { ...car, user_id: user.id });

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