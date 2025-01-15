import { client } from '@/sanity/lib/client'
import { STARTUPS_BY_AUTHOR_QUERY } from '@/sanity/lib/queries'
import React from 'react'
import StartupCard, { StartupCardType } from '@/components/StartupCard'

const UserStartups = async ({id}:{id:string}) => {

    const startups = await client.withConfig({useCdn:false}).fetch(STARTUPS_BY_AUTHOR_QUERY,{id})

  return (
    <>

    {
        startups?.length > 0 ? (
            startups.map((startup:StartupCardType,index:number)=>{
                return(
                    <StartupCard key={startup._id} post={startup}/>
                )
            })
        ):(
            <p className='no-result'>
                No startups found
            </p>
        )
    }
        
    </>
  )
}

export default UserStartups