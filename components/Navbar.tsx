import { auth, signIn, signOut } from '@/auth'
import { BadgePlus, LogOut } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Navbar = async() => {

    const session = await auth()


    return (
        <div className='px-5 py-3 bg-white shadow-sm font-work-sans'>
            <nav className='flex items-center justify-between'>
                <Link href="/">
                    <Image src="/logo.png" alt="YC_Directory Logo" width={144} height={30}  />
                </Link>

                <div className='flex items-center gap-5 text-black'>

                    {
                        session && session?.user ? (
                            <>
                                <Link href={"/startup/create"}>
                                    <span className='max-sm:hidden'>Create</span>
                                    <BadgePlus className='size-6 sm:hidden text-pink-600' />
                                </Link>

                                <form action={async()=>{
                                    "use server"
                                    await signOut({redirectTo:"/"})
                                }}
                                className='flex align-items-center'
                                >
                                    <button  type='submit'>
                                        <span className='max-sm:hidden'>Logout</span>
                                        <LogOut className='size-6 sm:hidden text-pink-600' />
                                    </button>
                                    
                                </form>

                                <Link href={`/user/${session?.id}`}>
                                    <Avatar className='size-10'>
                                        <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name} />
                                        <AvatarFallback>{session?.user?.name?.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                </Link>
                            </>
                        ):(
                            <>

                                <form action={async()=>{
                                    "use server"
                                    await signIn('github')
                                }}>
                                    <button type='submit'>
                                        Login
                                    </button>
                                    
                                </form>
                            
                            </>
                        )
                    }


                </div>
            </nav>
        </div>
  )
}

export default Navbar