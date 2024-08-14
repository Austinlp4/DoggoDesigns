import { buildConfig } from "payload/config";
import { mongooseAdapter } from "@payloadcms/db-mongodb";
import { slateEditor } from "@payloadcms/richtext-slate";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { Users } from "./collections/users";
import { Products } from "./collections/products/products";
import { Media } from "./collections/media";
import { ProductFiles } from "./collections/product-file";
import { Orders } from "./collections/orders";
import path from "path";
import dotenv from "dotenv";
import { Tags } from "./collections/tags";

dotenv.config({
    path: path.resolve(__dirname, '../.env')
});

export default buildConfig({
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL || '', 
    collections: [
        Users, 
        Products, 
        Media, 
        ProductFiles, 
        Orders,
        Tags,
    ],
    routes: {
        admin: '/sell',
    },
    admin: {
        user: "users",
        bundler: webpackBundler(),
        meta: {
            titleSuffix: "- DoggoDecals",
            favicon: "/favicon.ico",
            ogImage: "/thumbnail.png"
        }
    },
    rateLimit: {
        max: 2000,
    },
    editor: slateEditor({}),
    db: mongooseAdapter({
        url: process.env.MONGODB_URL!,
    }),
    typescript: {
        outputFile: path.resolve(__dirname, 'payload-types.ts'),
    }
})