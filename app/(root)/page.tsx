import { auth } from "@/auth";
import SearchForm from "@/components/SearchForm";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
// import { client } from "@/sanity/lib/client";
import { sanityFetch ,SanityLive} from "@/sanity/lib/live";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";

export default async function Home({searchParams}: {searchParams:Promise<{query: string}>}) {

    const query  =  (await searchParams).query

    // const posts = await  client.fetch(STARTUPS_QUERY) // after 60 sec on refresh
    // revalidate every time whenever need any change

    const params = {search:query || null}

    // const session = await auth()

    const {data:posts} = await sanityFetch({query:STARTUPS_QUERY,params})

    return (
      <>  
        <section className="pink_container">
          <h1 className="heading">
            Pitch Your Startup, <br/>
            Connect With Entrepreneurs
          </h1>

          <p className="sub-heading !max-w-3xl">
            Submit Ideas , Vote on Pitches , and Get Noticed in Virtual Competitions.
          </p>

          <SearchForm query={query}/>

        </section>

        <section className="section_container">

          <p className="text-30-semibold">
            {query ? `Search Results for "${query}"` : "All Startups"}
          </p>


          <ul className="mt-7 card_grid">
              {
                posts?.length > 0 ?
                (posts.map((post:StartupCardType,index:number) => {
                  return (
                    <StartupCard  
                      key={post?._id}
                      post={post}
                    />
                  )
                })) :(
                  <p className="no-results">
                      No Startups Found
                  </p>
                )
              }
          </ul>

        </section>

        <SanityLive />
      </>
    );
}