import { UpdateCarUseCase } from './update-car.js';
import { carFixture } from '../../tests/fixtures/car.js';

describe('UpdateCarUseCase', () => {
    const carId = 'valid_id';
    const car = {
        ...carFixture,
        id: undefined,
    };

    class PostgresGetByIdRepositoryStub {
        async execute(carId) {
            return {
                ...car,
                id: carId,
            };
        }
    }

    class PostgresUpdateCarRepository {
        async execute(carId, carData) {
            return {
                ...carData,
                id: carId,
            };
        }
    }

    const makeSut = () => {
        const postgresGetByIdRepositoryStub = new PostgresGetByIdRepositoryStub();

        const postgresUpdateCarRepository = new PostgresUpdateCarRepository();

        const sut = new UpdateCarUseCase(
            postgresGetByIdRepositoryStub,
            postgresUpdateCarRepository
        );

        return sut;
    };
    test('should update car sucessfully', async () => {
        const sut = makeSut();

        const result = await sut.execute(carId, car);

        expect(result).toBeTruthy();
    });

    test('should throw a car do not exists error', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetCarByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                return null;
            });

        const promise = sut.execute(carId, car);

        await expect(promise).rejects.toThrow(new Error('Car do not exists'));
    });

    test('should ensure PostgresGetCarByIdRepository is called', async () => {
        const sut = makeSut();

        const getCarByIdRepositorySpy = import.meta.jest.spyOn(
            sut.postgresGetCarByIdRepository,
            'execute'
        );

        await sut.execute(carId, car);

        expect(getCarByIdRepositorySpy).toHaveBeenCalled();
        expect(getCarByIdRepositorySpy).toHaveBeenCalledWith(carId);
    });

    test('should ensure PostgresUpdateCarRepository is called', async () => {
        const sut = makeSut();

        const updateCarRepositorySpy = import.meta.jest.spyOn(
            sut.postgresUpdateCarRepository,
            'execute'
        );

        await sut.execute(carId, car);

        expect(updateCarRepositorySpy).toHaveBeenCalled();
        expect(updateCarRepositorySpy).toHaveBeenCalledWith(carId, car);
    });

    test('should throw if PostgresGetCarByIdRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresGetCarByIdRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(carId, car);

        await expect(promise).rejects.toThrow();
    });

    test('should throw if PostgresUpdateCarRepository throws', async () => {
        const sut = makeSut();

        import.meta.jest
            .spyOn(sut.postgresUpdateCarRepository, 'execute')
            .mockImplementationOnce(() => {
                throw new Error();
            });

        const promise = sut.execute(carId, car);

        await expect(promise).rejects.toThrow();
    });
});
