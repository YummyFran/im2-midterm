import { auth } from '@/auth'
import OnBoarding from '@/components/OnBoarding'
import React from 'react'

const page = async () => {
    const session = await auth();

  return (
    <OnBoarding email={session?.user.email} />
  )
}

export default page