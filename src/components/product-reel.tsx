'use client'

import { TQueryValidator } from "@/lib/validators/query-validator";
import { Product } from "../payload-types";
import { trpc } from "@/trpc/client";
import Link from "next/link";
import { ProductListing } from "./product-listing";
import Fuse from 'fuse.js';

interface ProductReelProps {
    title: string;
    subtitle?: string;
    href?: string;
    query: TQueryValidator;
    search?: string;
}

const FALLBACK_LIMIT = 4;

export const ProductReel = (props: ProductReelProps) => {
    const { title, subtitle, href, query, search } = props;

    const { data: queryResults, isLoading } = trpc.getInfiniteProducts.useInfiniteQuery({
        limit: query.limit ?? FALLBACK_LIMIT,
        query,
    }, {
        getNextPageParam: (lastPage) => lastPage.nextPage ?? undefined,
    });

    const products: Product[] = queryResults?.pages.flatMap((page) => 
        (page.items as unknown as Product[])
    ) ?? [];

    // Fuzzy search implementation
    const fuse = new Fuse(products, {
        keys: ['name', 'description', 'tags'],
        threshold: 0.4,
        includeScore: true,
    });

    const filteredProducts = search
        ? fuse.search(search).map(result => result.item)
        : products;

    let map: (Product | null)[] = [];
    if(filteredProducts && filteredProducts.length) {
        map = filteredProducts;
    } else if(isLoading) {
        map = new Array<null>(query.limit ?? FALLBACK_LIMIT).fill(null);
    }

    return (
        <section className="py-12">
            <div className="md:flex md:items-center md:justify-between mb-4">
                <div className="max-w-2xl px-4 lg:max-w-4xl lg:px-0">
                    {title ? (
                        <h1
                            className="text-2xl font-bold text-gray-900 sm:text-3xl"
                        >
                            {title}
                        </h1>
                    ) : null}
                    {subtitle ? (
                        <p
                            className="mt-2 text-sm text-muted-foreground"
                        >
                            {subtitle}
                        </p>
                    ) : null}
                </div>

                {href ? (
                    <Link 
                        href={href}
                        className="hidden text-sm font-medium text-orange-500 hover:text-orange-600 md:block"
                    >
                            Shop the collection <span aria-hidden="true">&rarr;</span>
                    </Link>
                ) : null}
            </div>

            <div className="relative">
                    <div className="mt-6 flex items-center w-full">
                        <div className="w-full grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 lg:gap-x-8">
                            {map.map((product, index) => (
                                <ProductListing 
                                    key={`product-${index}`}
                                    product={product}
                                    index={index}
                                />
                            ))}
                        </div>
                    </div>
            </div>
        </section>
    )
}