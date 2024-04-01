import { fiedlAccessOnlyAdmins } from '../../lib/utils'
import { PRODUCT_CATEGORIES } from '../../config'
import { CollectionConfig } from 'payload/types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Product } from '../../payload.types'
import { stripe } from '../../lib/stripe'

const addUser: BeforeChangeHook<Product> = ({ req, data }) => {
    const user = req.user

    return { ...data, user: user.id }
}

const createProductInStripe = async (data: Product): Promise<Product> => {
    const createdProduct = await stripe.products.create({
        name: data.name,
        description: data.description ?? '',
        default_price_data: {
            currency: 'USD',
            unit_amount: Math.round(data.price! * 100),
        },
    })
    return {
        ...data,
        stripeId: createdProduct.id,
        priceId: createdProduct.default_price as string,
    }
}

const updateProductInStripe = async (data: Partial<Product>) => {
    const updatedProduct = await stripe.products.update(data.stripeId!, {
        name: data.name,
        default_price: data.priceId!,
    })
    return {
        ...data,
        stripeId: updatedProduct.id,
        priceId: updatedProduct.default_price as string,
    }
}

const createOrUpdateStripeProduct: BeforeChangeHook<Product> = async (args) => {
    const data = args.data as Product
    if (args.operation === 'create') {
        return await createProductInStripe(data)
    } else if (args.operation === 'update') {
        return await updateProductInStripe(data)
    } else {
        return data
    }
}

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {},
    hooks: {
        beforeChange: [addUser, createOrUpdateStripeProduct],
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: { condition: () => false },
        },
        { name: 'name', label: 'Name', type: 'text', required: true },
        {
            name: 'description',
            label: 'Product details',
            type: 'textarea',
        },
        {
            name: 'price',
            label: 'Price in USD',
            type: 'number',
            min: 1,
            max: 1000,
            required: true,
        },
        {
            name: 'category',
            label: 'Category',
            type: 'select',
            options: PRODUCT_CATEGORIES.map(({ label, value }) => ({
                label,
                value,
            })),
            required: true,
        },
        {
            name: 'product_files',
            label: 'Product file(s)',
            type: 'relationship',
            required: true,
            relationTo: 'product_files',
            hasMany: false,
        },
        {
            name: 'approvedForSale',
            label: 'Product status',
            type: 'select',
            defaultValue: 'pending',
            access: {
                create: fiedlAccessOnlyAdmins,
                read: fiedlAccessOnlyAdmins,
                update: fiedlAccessOnlyAdmins,
            },
            options: [
                { label: 'Pending Verification', value: 'pending' },
                { label: 'Approved', value: 'approved' },
                { label: 'Denied', value: 'denied' },
            ],
        },
        {
            name: 'priceId',
            access: {
                create: () => false,
                update: () => false,
                read: () => false,
            },
            type: 'text',
            admin: {
                hidden: true,
            },
        },
        {
            name: 'stripeId',
            access: {
                create: () => false,
                update: () => false,
                read: () => false,
            },
            type: 'text',
            admin: {
                hidden: true,
            },
        },
        {
            name: 'images',
            type: 'array',
            label: 'Product Images',
            minRows: 1,
            maxRows: 4,
            required: true,
            labels: {
                singular: 'Image',
                plural: 'Images',
            },
            fields: [
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
            ],
        },
    ],
}
