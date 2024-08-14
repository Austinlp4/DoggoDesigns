'use client';

import { Icons } from "@/components/icons";
import { Button, buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodError, z } from "zod";
import { 
    AuthCredentialsValidator, 
    TAuthCredentialsValidator 
} from "@/lib/validators/account-credentials-validator";
import { trpc } from "@/trpc/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const Page = () => {
    const { 
        register, 
        handleSubmit, 
        formState: { 
            errors 
        },
    } = useForm<TAuthCredentialsValidator>({
        resolver: zodResolver(AuthCredentialsValidator),
    });

    const router = useRouter();

    const {
        mutate,
        isLoading,
    } = trpc.auth.createPayloadUser.useMutation({
        onError: (err) => {
            if(err.data?.code === 'CONFLICT') {
                toast.error(
                    "An account with that email already exists. Sin in instead?"
                );  
                return;
            }

            if(err instanceof ZodError) {
                toast.error(err.issues[0].message);
                return;
            }

            toast.error("An error occurred. Please try again.");
        },
        onSuccess: ({ sentToEmail }) => {
            toast.success(
                `We've sent a verification email to ${sentToEmail}. Click the link in the email to verify your email address.`
            );
            router.push('/verify-email?to=' + sentToEmail);
        }
    });
    

    const onSubmit = ({
        email,
        password,
    }: TAuthCredentialsValidator) => {
        mutate({ email, password });
    }

    return (
        <>
            <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="size-20"/>
                        <h1 className="text-2xl font-bold">
                            Create an account
                        </h1>

                        <Link href="/sign-in" className={
                            buttonVariants({ 
                                variant: 'link',
                                className: 'text-muted-foreground'
                            })}>
                            Already have an account? Sign in
                            <ArrowRight className="size-4 ml-2"/>
                        </Link>
                    </div>

                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="email">
                                        Email
                                    </Label>
                                    <Input 
                                        {...register('email')}
                                        className={cn({
                                            "focua-visible:ring-red-500": errors.email,
                                        })}
                                        placeholder="you@example.com"
                                    />
                                    {errors.email && (
                                        <p className="text-red-500 text-sm">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                <div className="grid gap-1 py-2">
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Input 
                                        {...register('password')}
                                        type='password'
                                        className={cn({
                                            "focua-visible:ring-red-500": errors.password,
                                        })}
                                        placeholder="Password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>

                                <Button >
                                    Sign up
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Page;