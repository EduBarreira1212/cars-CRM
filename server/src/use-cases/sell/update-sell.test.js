import { UpdateSellUseCase } from './update-sell.js';

describe('UpdateSellUseCase', () => {
    const sellId = 'valid_id';
    const sell = {
        user_id: '6625edd1-2b56-42f9-84b4-2f86ba234c41',
        car_id: '0124edd1-2b89-42f9-13b4-2f86ba234c41',
        amount: 100000,
        profit: 10500,
    };

    class PostgresGetSellByIdRepositoryStub {
        async execute(sellId) {
            return {
                ...sell,
                id: sellId,
            };
        }
    }

    class PostgresUpdateSellRepository {
        async execute(sellId, sellData) {
            return {
                ...sellData,
                id: sellId,
            };
        }
    }

    const makeSut = () => {
        const postgresGetSellByIdRepositoryStub =
            new PostgresGetSellByIdRepositoryStub();

        const postgresUpdateSellRepository = new PostgresUpdateSellRepository();

        const sut = new UpdateSellUseCase(
            postgresGetSellByIdRepositoryStub,
            postgresUpdateSellRepository
        );

        return sut;
    };
    test('should update sell sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(sellId, sell);

        expect(result).toBeTruthy();
    });

    test('should throw a sell not found error', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            return null;
        });

        const promise = sut.execute(sellId, sell);

        await expect(promise).rejects.toThrow(new Error('Sell not found'));
    });

    test('should ensure PostgresGetSellByIdRepository is called', async () => {
        const sut = makeSut();

        const getSellByIdRepositorySpy = jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        );

        await sut.execute(sellId, sell);

        expect(getSellByIdRepositorySpy).toHaveBeenCalled();
        expect(getSellByIdRepositorySpy).toHaveBeenCalledWith(sellId);
    });

    test('should ensure PostgresUpdateSellRepository is called', async () => {
        const sut = makeSut();

        const updateCarRepositorySpy = jest.spyOn(
            sut.postgresUpdateSellRepository,
            'execute'
        );

        await sut.execute(sellId, sell);

        expect(updateCarRepositorySpy).toHaveBeenCalled();
        expect(updateCarRepositorySpy).toHaveBeenCalledWith(sellId, sell);
    });

    test('should throw if PostgresGetSellByIdRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresGetSellByIdRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(sellId, sell);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresUpdateSellRepository throws', async () => {
        const sut = makeSut();

        jest.spyOn(
            sut.postgresUpdateSellRepository,
            'execute'
        ).mockImplementationOnce(() => {
            throw new Error();
        });

        const promise = sut.execute(sellId, sell);

        await expect(promise).rejects.toThrow();
    });
});