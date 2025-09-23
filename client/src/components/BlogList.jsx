import React from 'react'
import BlogCard from "./BlogCard"

const BlogList = ({blogs}) => {
  return (
    <div className="grid grid-cols-1 w-1/2 gap-12 mx-auto">
      {blogs.map((blog, index) => (
        <BlogCard
          key={index}
          title={blog.title}
          author={blog.author}
          description={blog.description}
        />
      ))}
      
    </div>
  )
}

export default BlogList