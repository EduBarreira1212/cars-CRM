const Vehicle = () => {
    return (
        <div className="flex w-fit flex-col gap-3 rounded-md border-solid bg-slate-100 p-5 text-center shadow-md">
            <span>Model</span>
            <span>Brand</span>
            <span>Year</span>
            <span>Plate</span>
            <span>EntryPrice</span>
            <span>Despesas totais: 0</span>
            <span>Tempo em estoque: 0 Dias</span>
        </div>
    );
};

export default Vehicle;