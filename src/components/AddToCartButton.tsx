'use client'

import React, { FC, useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useCart } from '@/hooks/use-cart'
import { Product } from '@/payload.types'

type AddToCartButtonProps = {
    product: Product
}

export const AddToCartButton: FC<AddToCartButtonProps> = ({ product }) => {
    const [isSuccess, setIsSuccess] = useState<boolean>(false)
    const { addItem } = useCart()
    useEffect(() => {
        const timeout = setTimeout(() => {
            setIsSuccess(false)
        }, 2000)
        return () => clearTimeout(timeout)
    }, [isSuccess])

    const addToCart = () => {
        setIsSuccess(true)
        addItem(product)
    }
    return (
        <Button size="lg" className="w-full" onClick={addToCart}>
            {isSuccess ? 'Added!' : 'Add to cart'}
        </Button>
    )
}
