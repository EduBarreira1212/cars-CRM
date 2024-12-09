import { useUser } from '@clerk/clerk-react';
import { zodResolver } from '@hookform/resolvers/zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { CreateSell } from '../types';
import { createSellSchema } from '../schemas/zodSchemas';
import { useCreateSell } from '../hooks/data/useCreateSell';
import ModalContainer from '../components/ModalContainer';
import SubmitBtn from '../components/SubmitBtn';
import InputErrorMessage from '../components/InputErrorMessage';

type CreateSellModalprops = {
    carId: string;
    onClose: () => void;
};

const CreateSellModal = ({ carId, onClose }: CreateSellModalprops) => {
    const { user } = useUser();

    const { mutate, isPending } = useCreateSell(user?.externalId ?? '');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CreateSell>({
        resolver: zodResolver(createSellSchema),
    });

    const onSubmit: SubmitHandler<CreateSell> = async (createSellParams) => {
        if (!user || !user.externalId) return;

        const newSell = {
            ...createSellParams,
            user_id: user?.externalId,
            car_id: carId,
        };

        mutate(newSell, {
            onSuccess: () => {
                onClose();
            },
        });
    };

    return (
        <ModalContainer>
            <button onClick={onClose}>X</button>
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-1 p-5"
            >
                <label>Valor da venda:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('amount', { valueAsNumber: true })}
                />
                {errors.amount && (
                    <InputErrorMessage>{errors.amount.message}</InputErrorMessage>
                )}
                <label>Lucro:</label>
                <input
                    className="border-2 p-2"
                    type="number"
                    {...register('profit', { valueAsNumber: true })}
                />
                {errors.profit && (
                    <InputErrorMessage>{errors.profit.message}</InputErrorMessage>
                )}
                <SubmitBtn value="Adicionar venda" disabled={isPending} />
            </form>
        </ModalContainer>
    );
};

export default CreateSellModal;
