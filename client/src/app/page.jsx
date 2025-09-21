
import Link from 'next/link'

const Home = () => {

  return (
    <div className='flex flex-col justify-center items-center h-screen'>
      {/* TODO: Landing page here */}
      <div className="flex gap-4">
        <Link href="/login" className='text-accentborder border-2 border-accent py-2 px-6 rounded-md'>Login</Link>
        <Link href="/signup" className='bg-accent-gradient text-white py-2 px-6 rounded-md'>Signup</Link>
      </div>
    </div>
  )
}

export default Home