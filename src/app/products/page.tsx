import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { ProductReel } from '@/components/ProductReel'
import { PRODUCT_CATEGORIES } from '@/config'
import { NextPage } from 'next'
import React from 'react'

type Param = string | string[] | undefined
type ProductPageProps = {
    searchParams: { [key: string]: Param }
}

const parse = (param: Param) => {
    return typeof param === 'string' ? param : undefined
}

const ProductPage: NextPage<ProductPageProps> = ({ searchParams }) => {
    const sort = parse(searchParams.sort)
    const category = parse(searchParams.category)
    const label = PRODUCT_CATEGORIES.find(
        ({ value }) => value === category
    )?.label

    return (
        <MaxWidthWrapper>
            <ProductReel
                title={label ?? 'Browse high quality assets'}
                query={{
                    category,
                    limit: 40,
                    sort: sort === 'desc' || sort === 'asc' ? sort : undefined,
                }}
            />
        </MaxWidthWrapper>
    )
}

export default ProductPage
