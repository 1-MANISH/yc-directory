import React from 'react'
import Ping from '@/components/Ping'
import { client } from '@/sanity/lib/client'
import { STARTUP_VIEWS_QUERY } from '@/sanity/lib/queries'
import { writeClient } from '@/sanity/lib/write-client'
import { after } from 'next/server'

const View = async ({id}:{id:string}) => {

    const {views:totalViews} =   await client.withConfig({
        useCdn:false, // if number of views is  updated then immediate refresh 
    }).fetch(STARTUP_VIEWS_QUERY,{id})    
    
    // TODO : Update the number of views when someone visits the page

    // allows you to schedule work to be executed after a response (or prerender) is finished
    after(async()=>{
        // Execute after the layout is rendered and sent to the user
        await writeClient
            .patch(id)
            .set({views:totalViews + 1})
            .commit()
    })
    

    return (
        <div className='view-container'>
            <div className='absolute -top-2 -right-2'>
                <Ping />
            </div>

            <p className='view-text'>
                <span className='font-black'>{totalViews} views</span>
            </p>
        </div>
    )
}

export default View