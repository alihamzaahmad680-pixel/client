import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
  const { navigate } = useAppContext();

  return (
    <div className="mt-16">
      <p className="text-2xl md:text-3xl font-medium">Categories</p>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-3 mt-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="group flex flex-col cursor-pointer py-4 gap-2 rounded-lg justify-center items-center"
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/all-products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-105 transition w-16 h-16 object-contain"
            />

            <p className="group-hover:text-green-500 transition text-center text-xs">
              {category.text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
