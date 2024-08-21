'use client'

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductReel } from "@/components/product-reel";
import { PRODUCT_CATEGORIES } from "@/config";
import { useState } from "react";

type Param = string | string[] | undefined;

interface ProductPageProps {
    searchParams: {[key: string]: Param}
}

const parse = (param: Param) => {
    return typeof param === "string" ? param : undefined;
} 

const ProductsPage = ({ searchParams }: ProductPageProps) => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(parse(searchParams.category) || '');
    const [sortOrder, setSortOrder] = useState(parse(searchParams.sort) || '');

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === selectedCategory)?.label;

    return (
        <MaxWidthWrapper>
            <div className="py-8 space-y-4">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md"
                />
                <div className="flex space-x-4">
                    <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="px-4 py-2 border rounded-md"
                    >
                        <option value="">All Categories</option>
                        {PRODUCT_CATEGORIES.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.label}
                            </option>
                        ))}
                    </select>
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
                title={label ?? "Browse high-quality assets"}
                query={{
                    limit: 40,
                    category: selectedCategory,
                    sort: sortOrder === "desc" || sortOrder === "asc" ? sortOrder : undefined,
                    search: searchQuery
                } as any}
            />
        </MaxWidthWrapper>
    )
}

export default ProductsPage;