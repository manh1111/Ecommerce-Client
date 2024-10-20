import { useSearchProduct } from "@contexts/searchProductContext";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const Search = ({ placeholder = "Search...", wrapperClass }) => {
  const { searchProducts, setSearchTerm } = useSearchProduct();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const isSearching = useRef(false); 

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim() && !isSearching.current) {
        isSearching.current = true; 
        searchProducts(query.trim()).then(() => {
          const searchParams = new URLSearchParams({
            searchQuery: query.trim(),
          });
          navigate(`/search?${searchParams}`);
          setSearchTerm(query.trim());
          isSearching.current = false; 
        });
      }
    }, 300); 

    return () => {
      clearTimeout(handler);
    };
  }, [query, navigate, searchProducts, setSearchTerm]);

  return (
    <div className={`relative ${wrapperClass || ""}`}>
      <input
        className="field-input !pr-[60px]"
        type="search"
        placeholder={placeholder}
        value={query}
        onChange={handleInputChange} 
        onKeyDown={(e) => {
          if (e.key === "Enter" && query.trim()) {
            setQuery(query.trim()); 
          }
        }}
      />
      <button
        className={`field-btn text-red !right-[40px] transition ${
          query ? "opacity-100" : "opacity-0"
        }`}
        onClick={() => {
          setQuery(""); 
          setSearchTerm(""); 
        }}
        aria-label="Clear all"
      >
        <i className="icon-xmark-regular" />
      </button>
      <button
        className="field-btn icon"
        aria-label="Search"
        onClick={() => {
          if (query.trim()) {
            setQuery(query.trim()); 
          }
        }}
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
