'use client'

import { ProductReel } from "@/components/product-reel";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { PRODUCT_CATEGORIES } from "@/config";
import { notFound } from "next/navigation";
import { useState } from "react";

interface PageProps {
    params: {
        category: string
    }
}

const Page = ({ params }: PageProps) => {
    const { category } = params;
    const [searchQuery, setSearchQuery] = useState('');
    const [sortOrder, setSortOrder] = useState('');

    const categoryItem = PRODUCT_CATEGORIES.find(
        ({ value }) => value === category
    );

    if (!categoryItem) {
        return notFound();
    }

    return (
        <MaxWidthWrapper>
            <div className="py-8 space-y-4">
                <h1 className="text-3xl font-bold">{categoryItem.label}</h1>
                <div className="flex space-x-4">
                    <input
                        type="text"
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex-grow px-4 py-2 border rounded-md"
                    />
                    <select
                        value={sortOrder}
                        onChange={(e) => setSortOrder(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="">Sort By</option>
                        <option value="asc">Price: Low to High</option>
                        <option value="desc">Price: High to Low</option>
                    </select>
                </div>
            </div>
            <ProductReel
                title={`${categoryItem.label} Products`}
                query={{
                    category: category,
                    limit: 40,
                    sort: sortOrder === "desc" || sortOrder === "asc" ? sortOrder : undefined,
                }}
                search={searchQuery}
            />
        </MaxWidthWrapper>
    );
};

export default Page;