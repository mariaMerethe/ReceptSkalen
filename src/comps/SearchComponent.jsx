import { useState } from "react";

const SearchComponent = ({onSearch})  => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleSubmit = () => {
        if (searchTerm.trim() !== "") onSearch(searchTerm);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") handleSubmit();
    };

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-6">
            <input 
                type="text"
                placeholder="Vad vill du laga?"
                className="w-96 px-4 py-2 rounded-lg shadow-md bg-white text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
            <button
                className="px-4 py-2 rounded-lg shadow-md bg-white text-gray-800 hover:bg-gray-100 transition" 
                onClick={handleSubmit}>
                Sök
            </button>
        </div>
    );
};

export default SearchComponent;