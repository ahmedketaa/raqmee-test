import React, { useRef, useState } from "react";
import { addProduct } from "../utilities/saveProducts";
import { Toast } from "primereact/toast";
import { useNavigate } from "react-router-dom";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    photo: "",
  });
  const [errors, setErrors] = useState({});
  const toast = useRef();
  const navigate = useNavigate();
  const Validates = () => {
    const newErrors = {};

    if (!product.name) {
      newErrors.name = "Product name is required";
    } else if (product.name.length < 4) {
      newErrors.name = "Product name must be at least 4 characters long";
    } else if (/^[0-9]/.test(product.name)) {
      newErrors.name = "Product name cannot start with a number";
    }

    if (!product.price) {
      newErrors.price = "Product price is required";
    } else if (isNaN(product.price) || product.price <= 0) {
      newErrors.price = "Product price must be positive value";
    }

    if (!product.category) {
      newErrors.category = "Product category is required";
    }

    if (!product.description) {
      newErrors.description = "Product description is required";
    }

    if (!product.photo) {
      newErrors.photo = "Product photo is required";
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProduct((prev) => ({
          ...prev,
          photo: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("entered");

    const validationErrors = Validates();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("validate");
    console.log("this product", product);

    addProduct(product);
    console.log("returned");

    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Product added successfully",
    });

    setProduct({
      name: "",
      price: "",
      category: "",
      description: "",
      photo: "",
    });
    setErrors({});
    setTimeout(() => {
      navigate("/products");
    }, 4000);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Toast ref={toast} />
      <div className="space-y-12">
        <div className=" border-gray-900/10 pb-12">
          <div className=" mb-5">
            <label htmlFor="name">
              Product Name:
              <input
                type="text"
                name="name"
                placeholder="Enter Product Name.."
                value={product.name}
                onChange={handleChange}
                className="block pl-2 w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </label>
            {errors.name && (
              <span className="error text-red-500">{errors.name}</span>
            )}
          </div>
          <div className=" mb-5">
            <label htmlFor="price">
              Product Price:
              <input
                type="text"
                name="price"
                placeholder="Enter Product Price.."
                value={product.price}
                onChange={handleChange}
                className="block pl-2 w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 "
              />
            </label>
            {errors.price && (
              <span className="error text-red-500">{errors.price}</span>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="category">
              Product Category:
              <select
                name="category"
                onChange={handleChange}
                className="block pl-2 w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
              >
                <option value="">Choose Category</option>
                <option value="Electronics">Electronics</option>
                <option value="Jewelery">Jewelery</option>
                <option value="Clothes">clothes</option>
              </select>
            </label>
            {errors.category && (
              <span className="error text-red-500">{errors.category}</span>
            )}
          </div>
          <div className="mb-5">
            <label htmlFor="description">
              Product Description:
              <input
                type="text"
                name="description"
                placeholder="Enter  Product Description.."
                value={product.description}
                onChange={handleChange}
                className="block pl-2 w-full outline-none rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </label>
            {errors.description && (
              <span className="error text-red-500">{errors.description}</span>
            )}
          </div>
          <div className="col-span-full">
            <label
              htmlFor="cover-photo"
              className="block pl-2 text-sm font-medium leading-6 text-gray-900"
            >
              Product photo
            </label>
            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
              <div className="text-center">
                <div className="mt-4 flex text-sm leading-6 text-gray-600">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer outline-none rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      name="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={handleFileChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs leading-5 text-gray-600">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
              <div>
                {product.photo && (
                  <img src={product.photo} alt="Product" className="preview" />
                )}
              </div>
            </div>
          </div>

          <button
            className="rounded-md mt-10 float-end bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            type="submit"
          >
            Add Product
          </button>
        </div>
      </div>
    </form>
  );
}

export default ProductForm;
