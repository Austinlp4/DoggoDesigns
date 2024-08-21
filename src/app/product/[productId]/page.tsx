import { AddToCartButton } from "../../../components/add-to-cart-button";
import { ImageSlider } from "../../../components/image-slider";
import { MaxWidthWrapper } from "../../../components/max-width-wrapper";
import { ProductReel } from "../../../components/product-reel";
import { PRODUCT_CATEGORIES } from "../../../config";
import { getPayloadClient } from "../../../get-payload";
import { formatPrice } from "../../../lib/utils";
import { Product } from "../../../payload-types";
import { Check, Shield } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

type ProductCategory = (typeof PRODUCT_CATEGORIES)[number]['value'];

interface PageProps {
    params: {
        productId: string;
    }
}

const BREADCRUMBS = [
    { id: 1, name: 'Home', href: '/' },
    { id: 2, name: 'Products', href: '/products' },
]

const Page = async ({ 
    params 
}: PageProps) => {
    const { productId } = params;
    const payload = await getPayloadClient();

    const { docs: products } = await payload.find({
        collection: 'products',
        limit: 1,
        where: {
            id: {
                equals: productId,
            },
            approvedForSale: {
                equals: "approved"
            }
        }
    })

    const [product] = products;

    if(!product) return notFound();

    if (product && !PRODUCT_CATEGORIES.map(({ value }) => value).includes(product.category as ProductCategory)) {
        return notFound();
    }

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === product.category)?.label;

    const validUrls = Array.isArray(product?.images)
    ? product.images
        .map(({ image }) => (typeof image === 'string' ? image : image.url))
        .filter(Boolean) as string[]
    : [];

    return (
        <MaxWidthWrapper className="bg-white">
            <div className="bg-white">
                <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                    {/* Main container */}
                    <div className="lg:grid lg:grid-cols-12 lg:gap-x-8">
                        {/* Product details */}
                        <div className="flex flex-col justify-between lg:col-span-6 lg:self-start h-full">
                            <div className="lg:col-span-12 h-full lg:self-start">
                                <ol className="flex items-center space-x-2">
                                    {BREADCRUMBS.map((breadcrumb, index) => (
                                        <li key={breadcrumb.href}>
                                            <div className="flex items-center text-sm">
                                                <Link 
                                                    href={breadcrumb.href}
                                                    className="font-medium text-sm text-muted-foreground hover:text-gray-900"
                                                >
                                                    {breadcrumb.name}
                                                </Link>
                                                {index !== BREADCRUMBS.length - 1 ? (
                                                    <svg 
                                                        viewBox='0 0 20 20'
                                                        fill='currentColor'
                                                        className='flex-shrink-0 size-5 ml-2 text-gray-300'
                                                        aria-hidden='true'
                                                    >
                                                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z"/>
                                                    </svg>
                                                ) : null}
                                            </div>
                                        </li>
                                    ))}
                                </ol>

                                <div className="mt-4">
                                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                                        {typeof product?.name === 'string' ? product.name : ""}
                                    </h1>
                                </div>

                                <section className="mt-4">
                                    <div className="flex items-center">
                                        <p className="font-medium text-gray-900">{formatPrice(typeof product?.price === 'number' ? product.price : 0)}</p>
                                        <div className="ml-4 border-l text-muted-foreground border-gray-300 pl-4">
                                            {label}
                                        </div>
                                    </div>

                                    <div className="mt-4 space-y-6 ">
                                        <p className="text-base text-muted-foreground">
                                            {typeof product?.name === 'string' ? product.name : ""}
                                        </p>
                                    </div>

                                    <div className="mt-6 flex items-center">
                                        <Check aria-hidden="true" className="size-5 flex-shrink-0 text-emerald-600" strokeWidth="3px"/>
                                        <p className="ml-2 text-sm text-muted-foreground">
                                            Eligible for instant delivery
                                        </p>
                                    </div>

                                    <div className="mt-6">
                                        <p className="text-sm text-muted-foreground">
                                            {typeof product?.description === 'string' ? product.description : ""}
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div className="pb-10 lg:col-span-12 lg:row-start-2 lg:max-w-lg lg:justify-self-end">
                                <div>
                                    <div className="mt-10">
                                        <AddToCartButton product={product as unknown as Product}/>
                                    </div>
                                    <div className="mt-6 text-center">
                                        <div className="group inline-flex text-sm text-medium">
                                            <Shield aria-hidden="true" className="size-5 mr-2 flex-shrink-0 text-gray-400" strokeWidth="3px"/>
                                            <span className="text-muted-foreground hover:text-gray-700">30 Day Return Guarantee</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Product image */}
                        <div className="lg:col-span-6">
                            <div className="aspect-square rounded-lg">
                                <ImageSlider urls={validUrls} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ProductReel 
                href="/products" 
                query={{ category: product?.category as string | undefined, limit: 4 }}
                title={`Similar ${label}`}
                subtitle={`Browse similar high quality ${label} just like ${product.name}`}
            />
        </MaxWidthWrapper>
    )
}

export default Page;