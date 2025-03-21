import { useState } from "react";

const SearchComponent = ({onSearch})  => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearch(searchTerm); //skickar söktermen när enter trycks
        }
    };

    return (
        <div>
            <input 
                type="text"
                placeholder="Sök efter en maträtt..."
                className="input input-bordered w-full max-w-xs"
                value={searchTerm}
                onChange={handleChange}
                onKeyDown={handleKeyPress}
            />
        </div>
    );
};

export default SearchComponent;