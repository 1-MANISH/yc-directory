import { defineField, defineType } from "sanity";

// startup of the day , startup of the week like that 

export const playlist = defineType({
    name: "playlist",
    title: "Playlist",
    type: "document",
    fields: [
        defineField({
            name: "title",
            type: "string",
        }),
        defineField({
            name: "slug",
            type: "slug",
            options:{
                source:"title", // autogenerate slug from title
            }
        }),
        defineField({
            name: "select",
            type: "array",
            of:[{type:"reference",to:[{type:"startup"}]}]
        }),
       
    ],
});