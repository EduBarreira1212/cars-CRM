import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import CreateSellModal from './CreateSellModal';

type ICar = {
    car: {
        id: string;
        user_id: string;
        name: string;
        brand: string;
        year: number;
        plate: string;
        entry_price: number;
        expenses: [];
        createdAt: string;
    };
};

const Vehicle = ({ car }: ICar) => {
    const [showCreateSellModal, setShowCreateSellModal] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-2 border-solid bg-slate-50 p-5 text-center text-brand-secondary shadow-md shadow-brand-primary">
            <span>{car.name}</span>
            <span>{car.brand}</span>
            <span>{car.year}</span>
            <span>{car.plate}</span>
            <span>{car.entry_price}</span>
            <span>{car.expenses}</span>
            <span>{car.createdAt}</span>
            <div className="flex flex-row justify-between">
                <Button onClick={() => navigate('/')}>Ver detalhes</Button>
                <Button onClick={() => setShowCreateSellModal(true)}>Vender</Button>
            </div>
            {showCreateSellModal &&
                createPortal(
                    <CreateSellModal
                        carId={car.id}
                        onClose={() => setShowCreateSellModal(false)}
                    />,
                    document.body
                )}
        </div>
    );
};

export default Vehicle;
