'use client'
import { Icons } from '@/components/Icons'
import { Button, buttonVariants } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import {
    AuthCredentialsValidator,
    TAuthCredentialsValidators,
} from '@/lib/validators/account-credentials-validators'
import { trpc } from '@/trpc/client'
import { zodResolver } from '@hookform/resolvers/zod'
import { Label } from '@radix-ui/react-label'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { ZodError } from 'zod'

const Page = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const isSeller = searchParams.get('as') === 'seller'
    const origin = searchParams.get('origin')

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<TAuthCredentialsValidators>({
        resolver: zodResolver(AuthCredentialsValidator),
    })
    const { mutate: signIn, isLoading } = trpc.auth.signIn.useMutation({
        onSuccess: ({}) => {
            toast.success('Signed in successfuly.')

            if (origin) {
                router.push(`/${origin}`)
                router.refresh()
                return
            }
            if (isSeller) {
                router.push('/sell')
                router.refresh()
                return
            }
            router.push('/')
            router.refresh()
        },
        onError: (err) => {
            if (err.data?.code === 'UNAUTHORIZED') {
                toast.error('Invalid email or password.')
                return
            }

            if (err instanceof ZodError) {
                toast.error(err.issues[0].message)
                return
            }

            toast.error('Something went wrong. Please try again.')
        },
    })

    const continueAsSeller = () => {
        router.push('?as=seller')
    }

    const continueAsCustomer = () => {
        router.replace('/sign-in', undefined)
    }

    const onSubmit = ({ email, password }: TAuthCredentialsValidators) => {
        console.log({ email, password })
        signIn({ email, password })
    }

    return (
        <>
            <div className="container relative flex flex-col items-center justify-center pt-20 lg:px-0">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <div className="flex flex-col items-center space-y-2 text-center">
                        <Icons.logo className="h-20 w-20 " />
                        <h1 className="text-2xl font-bold">
                            Sign in to your {isSeller && 'seller'} account
                        </h1>
                        <Link
                            href="sing-up"
                            className={buttonVariants({
                                variant: 'link',
                                className: 'gap-1.5',
                            })}
                        >
                            Don&apos;t have an account
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>
                    <div className="grid gap-6">
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="grid gap-2">
                                <div className="grid gap-1 py-2">
                                    <Label>
                                        Email
                                        <Input
                                            {...register('email')}
                                            className={cn({
                                                'focus-visible:ring-red-500':
                                                    errors.email,
                                            })}
                                            placeholder="you@example.com"
                                        />
                                    </Label>
                                    {errors?.email && (
                                        <p className="text-sm text-red-500">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>
                                <div className="grid gap-1 py-2">
                                    <Label>
                                        Password
                                        <Input
                                            {...register('password')}
                                            className={cn({
                                                'focus-visible:ring-red-500':
                                                    errors.password,
                                            })}
                                            type="password"
                                            placeholder="Your password"
                                        />
                                    </Label>
                                    {errors?.password && (
                                        <p className="text-sm text-red-500">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </div>
                                <Button disabled={isLoading}>Sign in</Button>
                            </div>
                        </form>
                        <div className="relative">
                            <div
                                aria-hidden
                                className="absolute inset-0 flex items-center"
                            >
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-background px-2 text-muted-foreground">
                                    or
                                </span>
                            </div>
                        </div>
                        {isSeller ? (
                            <Button
                                onClick={continueAsCustomer}
                                variant="secondary"
                                disabled={isLoading}
                            >
                                Continue as customer
                            </Button>
                        ) : (
                            <Button
                                onClick={continueAsSeller}
                                variant="secondary"
                                disabled={isLoading}
                            >
                                Continue as seller
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default Page
