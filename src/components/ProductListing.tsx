'use client'
import { Product } from '@/payload.types'
import React, { FC, useEffect, useState } from 'react'
import { Skeleton } from './ui/skeleton'
import Link from 'next/link'
import { cn, formatPrice } from '@/lib/utils'
import { PRODUCT_CATEGORIES } from '@/config'
import { ImageSlider } from './ImageSlider'

type ProductListingProps = {
    product: Product | null
    index: number
}

export const ProductListing: FC<ProductListingProps> = ({ product, index }) => {
    const [isVisible, setIsVisible] = useState<boolean>(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true)
        }, index * 75)
        return () => clearTimeout(timer)
    }, [index, product?.id])

    const categoryLabel = PRODUCT_CATEGORIES.find(
        ({ value }) => value === product?.category
    )?.label

    if (!product || !isVisible) {
        return <ProductPlaceholder />
    }
    const validUrls = product.images
        .map(({ image }) => (typeof image === 'string' ? image : image.url))
        .filter(Boolean) as string[]

    if (isVisible && product) {
        return (
            <Link
                href={`/product/${product.id}`}
                className={cn('group/main invisible size-full cursor-pointer', {
                    'visible animate-in fade-in-5': isVisible,
                })}
            >
                <div className="flex w-full flex-col">
                    <ImageSlider urls={validUrls} />

                    <h3 className="mt-4 text-sm font-medium text-gray-700">
                        {product.name}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">
                        {categoryLabel}
                    </p>
                    <p className="mt-1 text-sm font-medium text-gray-900">
                        {formatPrice(product.price)}
                    </p>
                </div>
            </Link>
        )
    }
}

const ProductPlaceholder = () => {
    return (
        <div className="flex w-full flex-col">
            <div className="relative aspect-square w-full overflow-hidden bg-zinc-100">
                <Skeleton className="size-full" />
            </div>
            <Skeleton className="mt-4 h-4 w-2/3 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-16 rounded-lg" />
            <Skeleton className="mt-2 h-4 w-12 rounded-lg" />
        </div>
    )
}
