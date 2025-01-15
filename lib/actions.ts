"use server"

import { auth } from "@/auth"
import { parseServerActionResponse } from "@/lib/utils"
import { writeClient } from "@/sanity/lib/write-client"
import slugify from "slugify"

export const createPitch = async (state:any,form:FormData,pitch:string) =>{

    const session = await auth()

    if(!session){
        return parseServerActionResponse({
            status:"ERROR",
            error:"Unauthorized | Not signed user can't create a pitch"
        })
    }

    const {title,description,category,link} = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== "pitch")
    )

    const slug = slugify(title as string,{lower:true,strict:true})

    try {

        const startup = {
            title,
            slug:{
                _type:"slug",
                current:slug
            },
            description,
            category,
            image:link,
            author:{
                _type:"reference",
                _ref:session?.id
            },
            views:0,
            pitch
        }

        const result = await writeClient.create({
            _type:'startup',
            ...startup
        })

        return parseServerActionResponse({
            ...result,
            status:"SUCCESS",
            error:''
        })
        
    } catch (error) {

        return parseServerActionResponse({
            status:"ERROR",
            error:JSON.stringify(error)
        })
    }


}