"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { resetPassword } from "@/lib/authService";
import Link from 'next/link'

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const uid = searchParams.get("uid");

  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [error, setError] = useState({
    newPassword: '',
    confirmPassword: ''
  })
  const [resetButton, setResetButton] = useState({
    disabled: false,
    innerText: "Reset Password"
  })
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async e => {
    e.preventDefault()

    setResetButton({ disabled: true, innerText: "Resetting Password" })
    setError({
        newPassword: '',
        confirmPassword: ''
    })

    if(formData.newPassword != formData.confirmPassword) {
        setError(prev=> ({ ...prev, confirmPassword: "Passwords do not match." }))
        return
    }
    console.log(uid)
    const [data, err] = await resetPassword({ uid, token, newPassword: formData.newPassword})

    console.log(data)
    if(err) {
      setResetButton(prev => ({ ...prev, disabled: false, innerText: "Reset Password"}))
      return
    }

    if(!data.success) {
      setResetButton(prev => ({ ...prev, disabled: false, innerText: "Reset Password"}))
      return
    }

    setResetButton(prev => ({ ...prev, disabled: false, innerText: "Reset Password"}))
    
  }
  
  if(isSuccess) return (
    <div className="flex h-screen justify-center items-center flex-col gap-5">
      <h2 className="text-3xl font-extrabold">We've changed your password</h2>
      <Link href="/login" className="bg-accent-gradient py-2 px-4 text-white rounded-lg">Back to Login</Link>
    </div>
  )
  return (
    <div className="flex justify-center items-center h-screen bg-gray-50">
      <div className="flex flex-col gap-2 bg-white p-5 shadow-xl rounded-lg w-100">
        <h1 className="text-2xl font-bold">Reset your password</h1>
        <form className="flex flex-col gap-4 mt-2" onSubmit={handleSubmit}>
          {/* <input className='py-2 px-4 border border-gray-200 rounded-md text-md' type="email" name='email' placeholder='Enter email' value={email} onChange={e => setEmail(e.target.value)} /> */}
          <div
            className={`rounded-lg overflow-hidden ${
              error.newPassword ? "bg-red-100" : "bg-light"
            } focus-input-group border border-gray-300`}
          >
            {error.newPassword ? (
              <label
                htmlFor="newPassword"
                className="block cursor-text px-4 pt-2 text-xs font-medium text-red-500"
              >
                {error.newPassword}
              </label>
            ) : (
              <label
                htmlFor="newPassword"
                className="block cursor-text px-4 pt-2 text-xs font-medium text-gray-800"
              >
                New Password
              </label>
            )}
            <input
              value={formData.newPassword}
              onChange={e => (setFormData(prev => ({ ...prev, newPassword: e.target.value})), setError(prev => ({ ...prev, newPassword: '' })))}
              type="password"
              name="newPassword"
              id="newPassword"
              placeholder="Create new password"
              className={`w-full px-4 pb-2 outline-none no-focus text-base autofill-${
                error.newPassword ? "error" : "light"
              } bg-transparent ${
                error.newPassword ? "text-red-500" : "text-gray-700"
              }`}
            />
          </div>
          <div
            className={`rounded-lg overflow-hidden ${
              error.confirmPassword ? "bg-red-100" : "bg-light"
            } focus-input-group border border-gray-300`}
          >
            {error.confirmPassword ? (
              <label
                htmlFor="confirmPassword"
                className="block cursor-text px-4 pt-2 text-xs font-medium text-red-500"
              >
                {error.confirmPassword}
              </label>
            ) : (
              <label
                htmlFor="confirmPassword"
                className="block cursor-text px-4 pt-2 text-xs font-medium text-gray-800"
              >
                Confirm Password
              </label>
            )}
            <input
              value={formData.confirmPassword}
              onChange={e => (setFormData(prev => ({ ...prev, confirmPassword: e.target.value})), setError(prev => ({ ...prev, confirmPassword: '' })))}
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              placeholder="Confirm password"
              className={`w-full px-4 pb-2 outline-none no-focus text-base autofill-${
                error.confirmPassword ? "error" : "light"
              } bg-transparent ${
                error.confirmPassword ? "text-red-500" : "text-gray-700"
              }`}
            />
          </div>
            <button
                type="submit"
                className="bg-accent-gradient text-white py-2 px-4 rounded-md cursor-pointer"
                disabled={resetButton.disabled}
            >
                {resetButton.innerText}
            </button>
        </form>
      </div>
    </div>
  );
}
