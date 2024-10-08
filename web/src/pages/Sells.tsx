import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Sell from '../components/Sell';

const Sells = () => {
    return (
        <div className="flex flex-row">
            <Navbar />
            <div className="flex w-full flex-col bg-brand-neutral">
                <Header />
                <div className="flex h-full flex-col items-center justify-center p-3">
                    <Sell />
                </div>
            </div>
        </div>
    );
};

export default Sells;
