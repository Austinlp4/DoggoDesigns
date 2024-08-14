'use client';

import { 
    Sheet, 
    SheetContent, 
    SheetFooter, 
    SheetHeader, 
    SheetTitle, 
    SheetTrigger 
} from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator";
import { buttonVariants } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { ArrowRight, MessageSquareWarning, ShoppingBag } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/hooks/use-cart";
import { ScrollArea } from "./ui/scroll-area";
import { CartItem } from "./cart-item";
import { useEffect, useState } from "react";

export const Cart = () => {
    const { items } = useCart();
    const itemCount = items.length;

    const [isMounted, setIsMounted] = useState<boolean>(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const cartTotal = items.reduce((total, { product }) => total + product.price, 0);

    const fee = 1;

    return (
        <Sheet>
            <SheetTrigger className="group -m-2 flex items-center p-2">
                <ShoppingBag 
                    className="size-6 flex-shrink-0 text-gray-400/90 group-hover:text-gray-600" 
                    aria-hidden="true"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {isMounted ? itemCount : 0}
                </span>
            </SheetTrigger>
            <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
                <SheetHeader className="space-y-2.5 pr-6">
                    <SheetTitle>
                        Cart ({itemCount})
                    </SheetTitle>
                </SheetHeader>
                {itemCount > 0 ? (
                    <>
                        <div className="flex w-full flex-col pr-6">
                            <ScrollArea>
                                {items.map(({ product }) => (
                                    <CartItem key={product.id} product={product}/>
                                ))}
                            </ScrollArea>
                        </div>
                        <div className="space-y-4 pr-6">
                            <Separator />
                            <div className="space-y-1.5 text-sm">
                                <div className="flex">
                                    <span className="flex-1">
                                        Shipping
                                    </span>
                                    <span>Free</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">
                                        Transaction Fee
                                    </span>
                                    <span>{formatPrice(fee)}</span>
                                </div>
                                <div className="flex">
                                    <span className="flex-1">
                                        Total
                                    </span>
                                    <span>{formatPrice(cartTotal + fee)}</span>
                                </div>
                            </div>
                            <SheetFooter>
                                <SheetTrigger asChild>
                                    <Link href="/cart" className={buttonVariants({ 
                                        className: "w-full",
                                     })}>
                                        Continue to Checkout
                                    </Link>
                                </SheetTrigger>
                            </SheetFooter>
                        </div>
                    </>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-1">
                        <div className="relative mb-4 size-60 text-orange-700">
                            <MessageSquareWarning className="size-60 drop-shadow-[35px_35px_35px_rgba(255,151,71,0.8)]"/>
                        </div>
                        <div className="text-xl font-semibold">
                            Your cart is empty
                        </div>
                        <SheetTrigger asChild>
                            <Link href="/products" className={buttonVariants({
                                variant: "link",
                                size: "sm",
                                className: "text-sm text-muted-foreground"
                            })}>
                                Add some items to your cart to get started
                                <ArrowRight className="size-4 ml-1" strokeWidth="3px" />
                            </Link>
                        </SheetTrigger>
                    </div>
                )}
            </SheetContent>
        </Sheet>
    )
}