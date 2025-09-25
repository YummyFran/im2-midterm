"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"

const Reroute = ({ url }) => {
    const router = useRouter()
    useEffect(() => {
        router.push(url)
    }, [])
  return <></>
}

export default Reroute