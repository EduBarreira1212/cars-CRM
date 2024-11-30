import { Link, useLocation } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import NavbarModal from '../modals/NavbarModal';

const Header = () => {
    const [showNavbarModal, setShowNavbarModal] = useState(false);

    const { user } = useUser();

    const location = useLocation();

    return (
        <header className="relative flex w-full flex-row items-center justify-between bg-brand-secondary px-5 py-3 text-brand-primary shadow-sm shadow-black">
            <button
                className="rounded-lg border-2 border-black px-1 pb-0.5 text-2xl shadow-lg shadow-black md:hidden"
                onClick={() => setShowNavbarModal(true)}
            >
                {'>'}
            </button>
            <h2 className="absolute left-1/2 -translate-x-1/2 transform md:hidden">
                {location.pathname.slice(1).charAt(0).toUpperCase() +
                    location.pathname.slice(2)}
            </h2>
            <div className="absolute left-1/2 hidden -translate-x-1/2 transform gap-4 md:flex">
                <Link
                    className="font-poppins transition-all duration-200 hover:scale-110 hover:text-brand-accent"
                    to="/vendas"
                >
                    Vendas
                </Link>
                <Link
                    className="font-poppins transition-all duration-200 hover:scale-110 hover:text-brand-accent"
                    to="/veiculos"
                >
                    Veículos
                </Link>
                <Link
                    className="font-poppins transition-all duration-200 hover:scale-110 hover:text-brand-accent"
                    to="/despesas"
                >
                    Despesas
                </Link>
                <Link
                    className="font-poppins transition-all duration-200 hover:scale-110 hover:text-brand-accent"
                    to="/leads"
                >
                    Leads
                </Link>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <UserButton />
                <span className="h-6 w-[4.5rem] overflow-hidden font-montserrat">
                    {user?.fullName}
                </span>
            </div>
            {showNavbarModal &&
                createPortal(
                    <NavbarModal onClose={() => setShowNavbarModal(false)} />,
                    document.body
                )}
        </header>
    );
};

export default Header;
