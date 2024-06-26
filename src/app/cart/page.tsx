'use client'
import { Loader } from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { FLAT_FEE, PRODUCT_CATEGORIES } from '@/config'
import { useCart } from '@/hooks/use-cart'
import { cn, formatPrice } from '@/lib/utils'
import { trpc } from '@/trpc/client'
import { Check, ImageIcon, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const { items, removeItem } = useCart()
    const [isMonted, setIsMonted] = useState(false)

    useEffect(() => {
        setIsMonted(true)
    }, [])
    const cartTotal = items.reduce(
        (total, { product }) => total + product.price,
        0
    )

    const productIds = items.map(({ product }) => product.id)
    const router = useRouter()

    const { mutate: createCheckoutSession, isLoading } =
        trpc.payment.createSession.useMutation({
            onSuccess: ({ url }) => {
                console.log({ url })
                if (url) {
                    router.push(url)
                }
            },
        })

    return (
        <div className="bg-white ">
            <div className="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                    Shopping cart
                </h1>
                <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16 ">
                    <div
                        className={cn('lg:col-span-7', {
                            'rounded-lg border-2 border-dashed border-zinc-200 p-12':
                                items.length === 0,
                        })}
                    >
                        <h2 className="sr-only">Items in your shopping cart</h2>
                        {items.length === 0 && isMonted ? (
                            <div className="flex h-full flex-col items-center justify-center space-y-1">
                                <div
                                    aria-hidden
                                    className="relative mb-4 size-40 text-muted-foreground"
                                >
                                    <Image
                                        src={'/hippo-empty-cart.png'}
                                        fill
                                        loading="eager"
                                        alt="empty shopping cart hippo	"
                                    />
                                </div>
                                <h3 className="text-2xl font-semibold">
                                    Your cart is empty
                                </h3>
                                <p className="text-center text-muted-foreground">
                                    Nothing to show here yet.
                                </p>
                            </div>
                        ) : null}
                        <ul
                            className={cn({
                                'divide-y divide-gray-200  border-b	border-t border-gray-200':
                                    items.length > 0,
                                'flex items-center justify-center': !isMonted,
                            })}
                        >
                            {!isMonted ? (
                                <Loader className="size-40 items-center self-center" />
                            ) : (
                                items.map(({ product }) => {
                                    const categoryLabel =
                                        PRODUCT_CATEGORIES.find(
                                            (c) => c.value === product.category
                                        )?.label

                                    const { image } = product.images[0]

                                    return (
                                        <li
                                            key={product.id}
                                            className="flex py-6 sm:py-10"
                                        >
                                            <div className="flex-shrink-0">
                                                <div className="relative size-24">
                                                    {typeof image !==
                                                        'string' &&
                                                    image.url ? (
                                                        <Image
                                                            src={image.url}
                                                            alt="product image"
                                                            fill
                                                            className="size-full rounded-md object-cover object-center sm:size-48"
                                                        />
                                                    ) : (
                                                        <div className="flex h-full items-center justify-center bg-secondary">
                                                            <ImageIcon
                                                                aria-hidden
                                                                className="size-4 text-muted-foreground"
                                                            />
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                                                <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                                                    <div>
                                                        <div className="flex justify-between">
                                                            <h3 className="text-sm">
                                                                <Link
                                                                    className="font-medium text-gray-700 hover:text-gray-800"
                                                                    href={`/product/${product.id}`}
                                                                >
                                                                    {
                                                                        product.name
                                                                    }
                                                                </Link>
                                                            </h3>
                                                        </div>
                                                        <div className="mt-1 flex text-sm ">
                                                            <p className="text-muted-foreground">
                                                                Category:{' '}
                                                                {categoryLabel}
                                                            </p>{' '}
                                                        </div>
                                                        <p className="mt-1 text-sm font-medium text-gray-900">
                                                            {formatPrice(
                                                                product.price
                                                            )}
                                                        </p>
                                                    </div>
                                                    <div className="mt-4 w-20 sm:mt-0 sm:pr-9">
                                                        <div className="absolute right-0 top-0">
                                                            <Button
                                                                aria-label="Remove product"
                                                                onClick={() => {
                                                                    removeItem(
                                                                        product.id
                                                                    )
                                                                }}
                                                                variant="ghost"
                                                            >
                                                                <X
                                                                    className="size-5"
                                                                    aria-hidden
                                                                />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="mt-4 flex space-x-2 text-sm text-gray-700">
                                                    <Check className="size-5 flex-shrink-0 text-green-500" />
                                                    <span>
                                                        Eligible for instant
                                                        delivery
                                                    </span>
                                                </p>
                                            </div>
                                        </li>
                                    )
                                })
                            )}
                        </ul>
                    </div>
                    <section className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
                        <h2 className="text-xl font-medium text-gray-900">
                            Order Summary
                        </h2>
                        <div className="mt-6 space-y-4">
                            <div className="flex items-center justify-between">
                                <p className="text-sm text-gray-600">
                                    Subtotal
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                    {isMonted ? (
                                        formatPrice(cartTotal)
                                    ) : (
                                        <Loader />
                                    )}
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <span>Flat Transaction Fee</span>
                                </div>
                                <div className="text-sm font-medium text-gray-900">
                                    {isMonted ? (
                                        formatPrice(FLAT_FEE)
                                    ) : (
                                        <Loader />
                                    )}
                                </div>
                            </div>
                            <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                                <div className="text-base font-medium text-gray-900">
                                    Order Total
                                </div>
                                <div className="text-base font-medium text-gray-900">
                                    {isMonted ? (
                                        formatPrice(cartTotal + FLAT_FEE)
                                    ) : (
                                        <Loader />
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="mt-6">
                            <Button
                                className="w-full"
                                size="lg"
                                onClick={() =>
                                    createCheckoutSession({ productIds })
                                }
                                disabled={items.length === 0 || isLoading}
                            >
                                {isLoading && <Loader className="size-4" />}
                                Checkout
                            </Button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    )
}

export default Page
