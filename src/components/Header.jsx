import React from "react";
import { Disclosure, DisclosurePanel } from "@headlessui/react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden"></div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
              <ul className="flex gap-3 items-center list-none ml-3 px-3 text-white hover:text-wheat">
              <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/products"}>Products</Link>
                </li>
                <li>
                  <Link to={"/products/add-product"}>Add Product</Link>
                </li>
              </ul>
            </div>
            <div className="hidden sm:ml-6 sm:block"></div>
          </div>
        </div>
      </div>

      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2"></div>
      </DisclosurePanel>
    </Disclosure>
  );
}

export default Header;
