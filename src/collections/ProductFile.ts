import { colletionAccessOnlyAdmins } from '../lib/utils'
import { User } from '../payload.types'
import { BeforeChangeHook } from 'payload/dist/collections/config/types'
import { Access, CollectionConfig } from 'payload/types'

const addUser: BeforeChangeHook = ({ req, data }) => {
    const user = req.user as User | null
    return { ...data, user: user?.id }
}

const yourOwnOrPurchased: Access = async ({ req }) => {
    const user = req.user as User | null
    if (!user) {
        return false
    }
    if (user?.role === 'admin') {
        return true
    }
    const { docs: products } = await req.payload.find({
        collection: 'products',
        depth: 0,
        where: {
            user: {
                equals: user.id,
            },
        },
    })
    const ownProductFileIds = products
        .map((product) => product.product_files)
        .flat()

    const { docs: orders } = await req.payload.find({
        collection: 'orders',
        depth: 2,
        where: {
            user: {
                equals: user.id,
            },
        },
    })

    const purchasedFileId = orders
        .map((order) => {
            return order.products.map((product) => {
                if (typeof product === 'string') {
                    return req.payload.logger.error(
                        'Search depth insuficient to find purchased file IDs'
                    )
                }
                return typeof product.product_files === 'string'
                    ? product.product_files
                    : product.product_files.id
            })
        })
        .filter(Boolean)
        .flat()

    return {
        id: {
            in: [...purchasedFileId, ...ownProductFileIds],
        },
    }
}

export const ProductFiles: CollectionConfig = {
    slug: 'product_files',
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
    },
    upload: {
        staticURL: '/product-files',
        staticDir: 'product-files',
        mimeTypes: ['image/*', 'font/*', 'application/postscript'],
    },
    hooks: {
        beforeChange: [addUser],
    },
    access: {
        read: yourOwnOrPurchased,
        update: colletionAccessOnlyAdmins,
        delete: colletionAccessOnlyAdmins,
    },
    fields: [
        {
            name: 'user',
            type: 'relationship',
            relationTo: 'users',
            required: true,
            hasMany: false,
            admin: {
                condition: () => false,
            },
        },
    ],
}
