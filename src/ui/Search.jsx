import { useSearchProduct } from "@contexts/searchProductContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Search = ({ placeholder = "Tìm kiếm...", wrapperClass }) => {
  const { searchProducts, setSearchTerm } = useSearchProduct();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const isSearching = useRef(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() && !isSearching.current) {
        isSearching.current = true;
        searchProducts(query.trim()).then(() => {
          navigate(`/search?searchQuery=${query}`);
          setSearchTerm(query.trim());
          isSearching.current = false;
        });
      }
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [navigate, searchProducts, setSearchTerm]);

  const handleSearch = () => {
    setQuery(query)
    setSearchTerm(query);
  };

  return (
    <div className={`relative ${wrapperClass || ""}`}>
      <input
        className="field-input !pr-[60px]"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)} // Update query on input change
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearch(); // Execute search on Enter key press
          }
        }}
      />
      <button
        className={`field-btn text-red !right-[40px] transition ${
          query ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setQuery(""); // Clear query
          setSearchTerm(""); // Clear search term in context
        }}
        aria-label="Clear all"
      >
        <i className="icon-xmark-regular" />
      </button>
      <button
        className="field-btn icon"
        aria-label="Search"
        onClick={handleSearch} // Execute search on button click
      >
        <i className="icon-magnifying-glass-solid" />
      </button>
    </div>
  );
};

Search.propTypes = {
  placeholder: PropTypes.string,
  wrapperClass: PropTypes.string,
};

export default Search;
