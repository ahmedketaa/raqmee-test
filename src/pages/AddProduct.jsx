import React from "react";
import ProductForm from "../components/ProductForm";

function AddProduct() {
  return (
    <div className="flex justify-center items-center  px-10 my-10 flex-col gap-10">
      <h3 className="font-bold text-indigo-600 text-lg">
        Here You Can Sell Your Products !
      </h3>
      <div className="w-1/2 shadow-lg shadow-blue-100 p-5 rounded">
        <ProductForm />
      </div>
    </div>
  );
}

export default AddProduct;
