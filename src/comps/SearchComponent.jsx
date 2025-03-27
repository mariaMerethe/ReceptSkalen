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
                placeholder="Sök efter en maträtt..."
                className="input input-bordered w-96 border-gray-300 text-gray-800 bg-white placeholder-gray-400 focus:border-gray-600 focus:outline-none"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
            <button
                className="btn bg-white text-gray-800 border border-gray-300 hover:bg-gray-100" onClick={handleSubmit}>
                Sök
            </button>
        </div>
    );
};

export default SearchComponent;