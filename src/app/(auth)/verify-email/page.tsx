import { VerifyEmail } from "@/components/verify-email";
import { MailCheck } from "lucide-react";

interface PageProps {
    searchParams: {[key: string]: string | string[] | undefined};
}

const VerifyEmailPage = ({ searchParams }: PageProps) => {
    const token = searchParams.token;
    const toEmail = searchParams.to;

    return (
        <div className="container relative flex pt-20 flex-col items-center justify-center lg:px-0">
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                {token && typeof token === "string" ? (
                    <div className="grid gap-6">
                        <VerifyEmail token={token}/>
                    </div>
                ) : (
                    <div className="flex h-full flex-col items-center justify-center space-y-1">
                        <div className="relative size-60 text-muted-foreground">
                            <MailCheck className="size-60 text-orange-600" aria-hidden='true'/>
                        </div>
                        <h3 className="font-semibold text-2xl">Check for email</h3>

                        {toEmail ? (
                            <p className="text-muted-foreground text-center">
                                We&apos;ve sent a verification email to <span className="font-semibold">{toEmail}</span>. Click the link in the email to verify your email address.
                            </p>
                        ) : (
                            <p className="text-muted-foreground text-center">
                                We&apos;ve sent a verification email. Click the link in the email to verify your email address.
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default VerifyEmailPage;