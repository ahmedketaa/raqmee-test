import React, { useEffect, useState } from "react";
import { CiSearch } from "react-icons/ci";
import { getProducts } from "../utilities/saveProducts";

function Filtration({
  setCurrentProducts,
  indexOfFirstProduct,
  indexOfLastProduct,
}) {
  const products = getProducts();

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const filteredProducts = products
      .filter(
        (product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((product) => category === "" || product.category === category)
      .sort((a, b) => {
        if (sort === "name-asc") return a.name.localeCompare(b.name);
        if (sort === "name-desc") return b.name.localeCompare(a.name);
        if (sort === "price-asc") return a.price - b.price;
        if (sort === "price-desc") return b.price - a.price;
        return 0;
      });

    setCurrentProducts(
      filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    );
  }, [
    searchTerm,
    category,
    sort,
    indexOfFirstProduct,
    indexOfLastProduct,
    setCurrentProducts,
  ]);

  return (
    <div className="flex justify-between items-center mt-5">
      <div className="relative w-1/2">
        <input
          type="text"
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded p-2 pr-10 w-full outline-indigo-600"
        />
        <CiSearch size={17} className="absolute right-3 top-3 text-gray-500" />
      </div>

      <div className="filter">
        <label htmlFor="sorting" className="font-semibold  ml-4 mr-2">
          Sort By
        </label>
        <select
          id="sorting"
          onChange={(e) => setSort(e.target.value)}
          className="border outline-indigo-600 text-gray-400 rounded p-2"
        >
          <option value="name-asc">A-Z</option>
          <option value="name-desc">Z-A</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
        </select>
        <select
          onChange={(e) => setCategory(e.target.value)}
          className="outline-indigo-600 border rounded p-2 ml-4"
        >
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Jewelery">Jewelery</option>
          <option value="Clothes">clothes</option>
        </select>
      </div>
    </div>
  );
}

export default Filtration;
