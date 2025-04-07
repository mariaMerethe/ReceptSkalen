const USPComponent = () => {

    const uspItems = [
        "Enkla recept för vardagen",
        "Snabblagade måltider",
        "Fokuserar på naturliga ingredienser",
        "Spara dina favoriter med ett klick"
    ];

    return (
        <div className="w-full bg-primary shadow-md">
            <div className="max-w-7-xl mx-auto px-4 py-3">
                <p className="text-center text-sm text-gray-800 font-medium flex flex-wrap justify-center items-center gap-y-2">
                    {uspItems.map((item, index) => (
                        <span key={index} className="flex items-center">
                            {index !== 0 && <span className="mx-2 text-gray-800">•</span>}
                            {item}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
};

export default USPComponent;