import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { ProductReel } from "@/components/product-reel";
import { PRODUCT_CATEGORIES } from "@/config";

type Param = string | string[] | undefined;

interface ProductPageProps {
    searchParams: {[key: string]: Param}
}

const parse = (param: Param) => {
    return typeof param === "string" ? param : undefined;
} 

const ProductsPage = ({ searchParams }: ProductPageProps) => {
    const sort = parse(searchParams.sort);
    const category = parse(searchParams.category);

    const label = PRODUCT_CATEGORIES.find(({ value }) => value === category)?.label;

    return (
        <MaxWidthWrapper>
            <ProductReel 
                title={label ?? "Browse high-quality assets"}
                query={{
                    limit: 40,
                    category,
                    sort: sort === "desc" || sort === "asc" ? sort : undefined
                }}
            />
        </MaxWidthWrapper>
    )
}

export default ProductsPage;