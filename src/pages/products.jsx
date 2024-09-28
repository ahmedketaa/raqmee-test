import React, { useEffect, useState } from "react";
import ProductCard from "../resubleComponents/ProductCard";
import Pagination from "../components/Pagination";
import Filtration from "../components/Filteration";
import { getProducts } from "../utilities/saveProducts";

function Products() {
  const products = getProducts();

  const [currentPage, setCurrentPage] = useState(1);
  const [currentProducts, setCurrentProducts] = useState([]);
  const productsPerPage = 4;
  const pageNumbers = [];
  const totalPages = Math.ceil(products.length / productsPerPage);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    setCurrentProducts(products.slice(indexOfFirstProduct, indexOfLastProduct));
  }, [currentPage]);
  if (!currentProducts) {
    return <div>loading....</div>;
  }

  return (
    <div className="items- gap-10 flex flex-col px-10 mt-10">
      <Filtration
        setCurrentProducts={setCurrentProducts}
        indexOfFirstProduct={indexOfFirstProduct}
        indexOfLastProduct={indexOfLastProduct}
      />

      {currentProducts.length > 0 ? (
        <div className="grid  grid-cols-4 gap-10 mt-4">
          {currentProducts.map((product, index) => (
            <div key={index}>
              <ProductCard
                name={product.name}
                price={product.price}
                category={product.category}
                desc={product.description}
                photo={product.photo}
              />
            </div>
          ))}
        </div>
      ) : (
        <div
          className="border flex w-full justify-center py-5 "
          style={{ width: "100%" }}
        >
          <h3 className="p-5">There Is No Products </h3>
        </div>
      )}
      <Pagination
        pageNumbers={pageNumbers}
        action={handlePageClick}
        currentPage={currentPage}
      />
    </div>
  );
}

export default Products;
