import React, { useState, useEffect, useRef } from "react";
import api from "../axios/Axios";
import { Link } from "react-router-dom";

const SearchShop = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showList, setShowList] = useState(false); // Control list visibility
  const inputRef = useRef(null); // Reference for input field
  const listRef = useRef(null); // Reference for product list

  // Fetch products based on the query
  useEffect(() => {
    if (query.length >= 3) {
      setLoading(true);
      api
        .get(`/search?query=${query}`)
        .then((response) => {
          // Assuming the API returns a list of products
          setProducts(response.data.data.products.slice(0, 6)); // Show up to 6 products
          setLoading(false);
          setShowList(true); // Show the list when products are found
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
          setLoading(false);
        });
    } else {
      setProducts([]); // Clear the list if less than 3 letters are typed
      setShowList(false); // Hide the list
    }
  }, [query]);

  // Hide the list when clicking outside the input and product list
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target) &&
        listRef.current &&
        !listRef.current.contains(event.target)
      ) {
        setShowList(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Show the list when the input is focused
  const handleFocus = () => {
    if (products.length > 0) {
      setShowList(true);
    }
  };

  return (
    <div className="relative font-robo">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        className="border border-gray-300 rounded p-2 w-full sm:w-[300px] outline-none"
        placeholder="Search for products..."
        ref={inputRef}
      />

      {loading ? (
        <p className="text-gray-500 absolute left-0 top-full z-20">Loading...</p>
      ) : (
        showList && (
          <ul
            className="bg-white w-full shadow-lg max-h-[280px] px-4 absolute left-0 top-full z-20 overflow-y-auto"
            ref={listRef}
          >
            {products.length > 0
              ? products.map((product, index) => (
                  <li
                    key={index}
                    className={`text-gray-800 flex items-center py-2 ${
                      products.length !== index + 1 && "border-b"
                    }`}
                  >
                    <img
                      src={product?.photos[0]}
                      alt={product?.title}
                      className="w-8 sm:w-12 h-8 sm:h-12 object-cover rounded mr-4"
                    />
                    <div>
                      <Link
                        to={`/shop/${product?.slug}`}
                        className="font-semibold capitalize text-sm sm:text-base"
                      >
                        {product?.title}
                      </Link>
                      <p className="text-green-600 text-sm sm:text-base">
                        ${product?.price}
                      </p>
                    </div>
                  </li>
                ))
              : query.length >= 3 && (
                  <p className="text-red-500">No products found.</p>
                )}
          </ul>
        )
      )}
    </div>
  );
};

export default SearchShop;
