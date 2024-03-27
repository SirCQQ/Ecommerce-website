import { fiedlAccessOnlyAdmins } from '../../lib/utils'
import { PRODUCT_CATEGORIES } from '../../config'
import { CollectionConfig } from 'payload/types'

export const Products: CollectionConfig = {
    slug: 'products',
    admin: {
        useAsTitle: 'name',
    },
    access: {},
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
