import { CollectionConfig } from "payload/types";

export const Tags: CollectionConfig = {
    slug: "tags",
    admin: {
        useAsTitle: "name"
    },
    fields: [
        {
            name: "name",
            label: "Tag Name",
            type: "text",
            required: true,
            unique: true // Ensure each tag name is unique
        }
    ]
};
