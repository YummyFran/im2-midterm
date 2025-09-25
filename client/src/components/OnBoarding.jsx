"use client"

import { getAuthUSer, saveUserDetails } from "@/lib/authService";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from 'react-icons/io5';

const capitalize = (str) => str && str.charAt(0).toUpperCase() + str.slice(1);
 
export default function OnBoarding({ email }) {
    const [credentials, setCredentials] = useState({
        name: "",
    })
    const [error, setError] = useState({
        name: null,
    })
    const [signUpButton, setSignUpButton] = useState({
        disabled: true,
        innerText: "Save"
    })
    const router = useRouter()

    const handleSubmit = async (e)=> {
        e.preventDefault()
        
        setSignUpButton(prev => ({...prev, disabled: true, innerText: "Saving..."}))
    
        if(credentials.name.trim() == "") {
            if(!credentials.name) {
                setError(prev => ({...prev, email: 'Name is required'}))
            }
        
            setSignUpButton(prev => ({...prev, disabled: false, innerText: "Save"}))
            return
        }
    
        const [data, err] = await saveUserDetails(credentials, email)
        
        if(err?.name || err?.email || err?.password) {
            setSignUpButton(prev => ({...prev, disabled: false, innerText: "Save"}))
            return
        }

        if(!data.success) {
            setError({
                name: data.nameError || ""
            })
            setSignUpButton(prev => ({...prev, disabled: false, innerText: "Save"}))
            return
        }
    
        setSignUpButton(prev => ({...prev, disabled: false, innerText: "Save"}))
        router.push('/')
    }

    const handleChange = (e) => {
        setError(prev => ({...prev, [e.target.name]: null}))
        setCredentials(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    
    useEffect(() => {
        setSignUpButton(prev => ({...prev, disabled: Object.values(credentials).some(el => !el)}))
    }, [credentials]);

    return (
        <div className="w-full min-h-screen flex justify-center md:justify-start bg-white">
            <form className="w-96 flex flex-col gap-3 mx-6 lg:mx-12 my-4" onSubmit={e => handleSubmit(e)}>
                <Link href='/' className="mb-4 lg:mb-2 text-gray-500 text-sm cursor-pointer flex items-center hover:underline w-fit">
                    <IoArrowBackOutline className="mr-2"/>
                    Back to Home
                </Link>
                <h1 className="text-2xl font-bold text-left pb-4 text-gray-800">Let's set up your profile</h1>

                <div className={`rounded-lg overflow-hidden ${error.name ? 'bg-red-100' : 'bg-light'} focus-input-group`}>   
                    {error.name ? 
                        <label htmlFor="name" className="block cursor-text px-4 pt-2 text-xs font-medium text-red-500">
                            {capitalize(error.name)}
                        </label>
                    :
                        <label htmlFor="name" className="block cursor-text px-4 pt-2 text-xs font-medium text-gray-800">
                            Name
                        </label>
                    }
                    <input value={credentials.name} onChange={e => handleChange(e)} type="text" name="name" id="name" placeholder="Enter your name" 
                        className={`w-full px-4 pb-2 outline-none no-focus text-base bg-transparent ${error.name ? 'text-red-500 autofill-error' : 'text-gray-700 autofill-light'}`}/>
                </div>
                <button disabled={signUpButton.disabled} type="submit" className="cursor-pointer bg-accent-gradient mt-4 text-white py-3 rounded-lg font-medium hover:brightness-95 disabled:opacity-50">
                    {signUpButton.innerText}
                </button> 
            </form>
            <div className="flex-1 min-h-screen bg-accent-gradient hidden md:block"></div>
        </div>
    )
}