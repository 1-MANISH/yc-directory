import { formateDate } from '@/lib/utils'
import { client } from '@/sanity/lib/client'
import { PLAYLIST_BY_SLUG_QUERY, STARTUP_BY_ID_QUERY } from '@/sanity/lib/queries'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React, { Suspense } from 'react'
import markdownit from "markdown-it"
import { Skeleton } from '@/components/ui/skeleton'
import View from '@/components/View'
import StartupCard, { StartupCardType } from '@/components/StartupCard'


// Enable Partial Prerendering (PPR) for a layout or page.
export const experimental_ppr = true

const page = async({params}:{params:Promise<{startupId:string}>}) => {

    const md = markdownit()

    const startupId = (await params)?.startupId

    const [post,{select:editorPosts}] = await  Promise.all([
         client.fetch(STARTUP_BY_ID_QUERY,{id:startupId}),// as ISR
         client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug:'editor-picks'})
    ])

    // as ISR
    // const post = await client.fetch(STARTUP_BY_ID_QUERY,{id:startupId})
     // const {select:editorPosts} = await client.fetch(PLAYLIST_BY_SLUG_QUERY,{slug:'editor-picks'})

    if(!post){
        return notFound()
    }

    const {_id,title,description,category,views,author:{_id:authorId,image:authorImage,name,username},_createdAt,image,pitch} = post

    const parsedContent = md.render(pitch || '')

    return (
    <>
        <section className="pink_container !min-h-[230px">
            <p className="tag">{formateDate(_createdAt)}</p>
            <h1 className='heading'>{title}</h1>
            <p className='sub-heading !max-w-5xl'>{description}</p>
        </section>

        <section className='section_container'>
            <img 
                src={image}
                alt='startup thumbnail'
                className='w-full h-auto rounded-xl'
            />

            <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
                <div className='flex-between gap-5'>
                    <Link href={`/user/${authorId}`} className='flex gap-3 items-center mb-3'>
                        <Image
                            src={authorImage}
                            alt="author image"
                            width={64}
                            height={64}
                            className='rounded-full drop-shadow-xl'
                        />

                        <div >
                            <p className='text-20-medium'>{name}</p>
                            <p className='text-16-medium !text-black-300'>@{username}</p>
                        </div>
                    </Link>

                    <p className='category-tag'>
                        {category}
                    </p>
                </div>

                <h3 className='text-30-bold'>
                    Pitch Details
                </h3>

                {
                    parsedContent ? (
                        <article 
                            dangerouslySetInnerHTML={{__html:parsedContent}}
                            className='prose max-w-4xl font-work-sans break-all'

                        />
                    ):(
                        <p className='no-result'>No Details provided</p>
                    )
                }
            </div>

            <hr 
                className='divider'
            />

            {/*TODO : EDITOR SELECTED STARTUPS */}

            {
                editorPosts.length > 0 && (
                    <div className='max-w-4xl max-auto'>
                        <p className='text-30-semibold mb-5'>Editor Picks</p>

                        <ul className='mt-7 card_grid-sm'>
                            {
                                editorPosts.map((post:StartupCardType,index:number)=>{
                                      return (
                                        <StartupCard key={index} post={post} />
                                      )  
                                })
                            }
                        </ul>

                    </div>
                )
            }

            {/*  This part need to update frequently -  using ppr*/}
            

            <Suspense fallback={<Skeleton className='view_skeleton'/>}>
                
                {/* Dynamic wala part */}

                <View id={startupId} />
            </Suspense>

        </section>

    </>
  )
}

export default page