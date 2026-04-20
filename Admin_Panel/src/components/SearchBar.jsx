import { FaSearch } from "react-icons/fa";

function SearchBar({ value, onChange, placeholder }) {
  return (
    <div className="relative flex-1 group mb-6 max-w-xl">
      
      {/* Glow */}
      <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-focus-within:opacity-100 blur-sm transition duration-300"></div>

      {/* Input Box */}
      <div className="relative flex items-center bg-gray-900 border border-gray-700 rounded-xl px-4 py-2 shadow-md">
        
        <FaSearch className="text-gray-400 mr-3" />

        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full bg-transparent outline-none text-sm text-gray-200 placeholder-gray-500"
        />
      </div>
    </div>
  );
}

export default SearchBar;