import React from "react";
import { CiHeart } from "react-icons/ci";

function ProductCard({ name, price, category, desc, photo }) {
  return (
    <div className=" rounded w-fit">
      <img
        src={photo || "p1.png"}
        alt="product"
        className="w-[300px] h-[280px] rounded"
      />
      <div className="flex justify-between items-center ">
        <div className="text">
          <h4 style={{ color: "#171717" }}>{name}</h4>
          <p className="font-semibold">{`€${price}.00`}</p>
        </div>
        <div className="cursor-pointer rounded text-gray-500 font-thin border p-1 border-gray-150 hover:text-red-500 transition">
          <CiHeart size={25} />
        </div>
      </div>
      <p>Category: {category}</p>
      {/* <p>{desc}</p> */}
    </div>
  );
}

export default ProductCard;
