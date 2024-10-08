import Link from "next/link"
import { MaxWidthWrapper } from "./max-width-wrapper"
import { Icons } from "./icons"
import { NavItems } from "./nav-items"
import { buttonVariants } from "./ui/button"
import { Cart } from "./cart"
import { getServerSideUser } from "@/lib/payload-utils"
import { cookies } from "next/headers"
import { UserAccountNav } from "./user-account-nav"

export const Navbar = async () => {
    const nextCookies = cookies();
    const { user } = await getServerSideUser(nextCookies);

    return (
        <div className="bg-white sticky z-50 top-0 inset-x-0 h-16">
            <header className="relative bg-white">
                <MaxWidthWrapper>
                    <div className="border-b border-gray-200">
                        <div className="flex h-16 items-center">

                            {/* TODO: Mobile nav */}

                            <div className="ml-4 flex lg:ml-0">
                                <Link href="/">
                                    <Icons.logo className="size-10 text-orange-700"/>
                                </Link>
                            </div>

                            <div className="hidden z-50 lg:ml-8 lg:block lg:self-stretch">
                                <NavItems />
                            </div>

                            <div className="ml-auto flex items-center">
                                <div className="hidden lg:flex lg:items-center lg:justify-end lg:space-x-6">
                                    {user ? null : (
                                        <Link href='/sign-in' className={buttonVariants({
                                            variant: 'ghost',
                                        })}>
                                            Sign In
                                        </Link>
                                    )}
                                    {user ? null : (
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    )}
                                    {user ? (
                                        <UserAccountNav user={user}/>
                                    ) : (
                                        <Link href="/sign-up" className={buttonVariants({
                                            variant: 'ghost'
                                        })}>
                                            Create Account
                                        </Link>
                                    )}
                                    {user ? (
                                       <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                    ) : null}
                                    {user ? null : (
                                        <div className="flex lg:ml-6">
                                            <span className="h-6 w-px bg-gray-200" aria-hidden="true" /> 
                                        </div>
                                    )}
                                    <div className="ml-4 flow-root lg:ml-6">
                                        <Cart />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </MaxWidthWrapper>
            </header>
        </div>
    )
}