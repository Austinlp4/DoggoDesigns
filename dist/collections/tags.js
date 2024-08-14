"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tags = void 0;
exports.Tags = {
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
