import React from 'react'

const Header = () => {
  return (
    <div className="bg-red-400 h-16 flex justify-center shadow-lg ">
        <div className="container px-[6rem] flex items-center gap-12 text-white">
            <h1 className="logo font-bold mr-auto text-xl">BlogPost</h1>
            <div className="relative inline-block px-4 py-2 
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:h-[2px] after:w-0 after:bg-red-100 
             after:transition-all after:duration-300 
             hover:after:w-full"
            >For You</div>
            <div className="saved-btn relative inline-block px-4 py-2 
             after:content-[''] after:absolute after:left-0 after:bottom-0 
             after:h-[2px] after:w-0 after:bg-red-100 
             after:transition-all after:duration-300 
             hover:after:w-full">Saved</div>
        </div>
    </div>
  )
}

export default Header