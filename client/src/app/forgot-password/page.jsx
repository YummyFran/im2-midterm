"use client";

import { searchAccount } from "@/lib/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const page = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState({
    email: ""
  })
  const [searchButton, setSearchButton] = useState({
    disabled: false,
    innerText: 'Search'
  })
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSearchButton(prev => ({ ...prev, disabled: true, innerText: "Searching"}))
    setError({ email: "" })
    const [data, err] = await searchAccount(email)

    if(err) {
      setSearchButton(prev => ({ ...prev, disabled: false, innerText: "Search"}))
      return
    }

    if(!data.success) {
      setError(prev=> ({ ...prev, email: data.error }))
      setSearchButton(prev => ({ ...prev, disabled: false, innerText: "Search"}))
      return
    }

    setSearchButton(prev => ({ ...prev, disabled: false, innerText: "Search"}))
    console.log(data)
    // router.push('/')
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex flex-col gap-2 bg-white p-5 shadow-xl rounded-lg">
        <h1 className="text-2xl font-bold">Find your account</h1>
        <p>Please enter you email to search for your account</p>
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          {/* <input className='py-2 px-4 border border-gray-200 rounded-md text-md' type="email" name='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} /> */}
          <div
            className={`rounded-lg overflow-hidden ${
              error.email ? "bg-red-100" : "bg-light"
            } focus-input-group border border-gray-300`}
          >
            {error.email ? (
              <label
                htmlFor="email"
                className="block cursor-text px-4 pt-2 text-xs font-medium text-red-500"
              >
                {error.email}
              </label>
            ) : (
              <label
                htmlFor="email"
                className="block cursor-text px-4 pt-2 text-xs font-medium text-gray-800"
              >
                Email
              </label>
            )}
            <input
              value={email}
              onChange={e => (setEmail(e.target.value), setError({ email: "" }))}
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email"
              className={`w-full px-4 pb-2 outline-none no-focus text-base autofill-${
                error.email ? "error" : "light"
              } bg-transparent ${
                error.email ? "text-red-500" : "text-gray-700"
              }`}
            />
          </div>
          <div className="flex justify-end gap-2">
            <Link
              href={"/login"}
              className="bg-gray-100 py-2 px-4 rounded-md hover:bg-gray-200 cursor-pointer"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="bg-accent-gradient text-white py-2 px-4 rounded-md cursor-pointer"
              disabled={searchButton.disabled}
            >
              {searchButton.innerText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default page;
