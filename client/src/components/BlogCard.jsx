import React from "react";
import { FaBookmark } from "react-icons/fa";

const BlogCard = ({ title, author, description }) => {
  return (
    <div className="group card relative bg-white border-b-2 border-accent shadow-md rounded-2xl p-6 hover:shadow-lg hover:border-[1] transition-shadow duration-300">
      <h1 className="text-2xl font-bold text-gray-900 mb-2 ">{title}</h1>
      <h3 className="text-sm text-gray-500 mb-4 text-accent">By: {author}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
      <button className=" group/bookmark absolute top-6 right-12 text-accent cursor-pointer ">
        <FaBookmark className="w-5 h-5 transform transition-transform duration-300 hover:scale-125 hover:text-accent" />
        <span className="absolute -top-10 right-0 px-2 py-1 text-xs text-white bg-black rounded opacity-0 transition-opacity duration-300 whitespace-nowrap
                  group-hover/bookmark:opacity-100 group-hover/bookmark:delay-1000">
          Add to favorite
        </span>
      </button>

      <button className="visit-btn absolute bottom-6 right-12 border-red-100 border-[1] text-gray-800 px-6 py-2 rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out cursor-pointer hover:bg-red-400 hover:text-white">
        Visit
      </button>
    </div>
  );
};

export default BlogCard;
