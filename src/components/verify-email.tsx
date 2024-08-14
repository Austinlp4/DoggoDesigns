'use client';

import { trpc } from "@/trpc/client";
import { Loader2, MailCheck, XCircle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface VerifyEmailProps {
    token: string;
};

export const VerifyEmail = ({ 
    token 
}: VerifyEmailProps) => {
    const {
        data,
        isLoading,
        isError,
    } = trpc.auth.verifyEmail.useQuery({
        token
    });

    if(isError) {
        return (
            <div className="flex flex-col items-center gap-2">
                <XCircle className="size-60 text-red-600" aria-hidden='true'/>
                <h3 className="font-semibold text-2xl mb-4">Oops! There was an issue</h3>
                <p className="text-muted-foreground text-sm text-center flex flex-col space-y-4">
                    <span>We were unable to verify your email address.</span>
                    <span>This could be due to an invalid token or an expired link.</span>
                    <span>Please try again.</span>
                </p>
            </div>
        )
    }

    if(data?.success) {
        return (
            <div className="flex h-full flex-col items-center justify-center">
                <div className="relatvie mb-4 size-60 text-muted-foreground">
                    <MailCheck className="size-60 text-orange-600" aria-hidden='true'/> 
                </div>

                <h3 className="font-semibold text-2xl">You&apos;re all set!</h3>
                <p className="text-muted-foreground text-center text-sm">
                    Your email address has been successfully verified.
                </p>
                <Link href='/sign-in' className={buttonVariants({ className: 'mt-4' })}>Sign In</Link>
            </div>
        )
    }

    if(isLoading) {
        return (
            <div className="flex flex-col items-center gap-2">
                <Loader2 className="animate-spin size-60 text-orange-400/80" aria-hidden='true'/>
                <h3 className="font-semibold text-2xl mb-4">Verifying...</h3>
                <p className="text-muted-foreground text-sm text-center">
                    This won&apos;t take long.
                </p>
            </div>
        )
    }

    return (
        <div>

        </div>
    );
};