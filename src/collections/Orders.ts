import { colletionAccessOnlyAdmins, fiedlAccessOnlyAdmins } from '../lib/utils'
import { User } from '../payload.types'
import { Access, CollectionConfig } from 'payload/types'

const yourOwn: Access = ({ req }) => {
    const user = req.user as User | null
    if (!user) {
        return false
    }
    if (user.role === 'admin') {
        return true
    }
    return {
        user: {
            equals: user.id,
        },
    }
}

export const Orders: CollectionConfig = {
    slug: 'orders',
    admin: {
        useAsTitle: 'Your Orders',
        description: 'A summary of all your orders.',
    },

    access: {
        read: yourOwn,
        update: colletionAccessOnlyAdmins,
        delete: colletionAccessOnlyAdmins,
        create: colletionAccessOnlyAdmins,
    },

    fields: [
        {
            name: '_isPaid',
            type: 'checkbox',
            access: {
                read: fiedlAccessOnlyAdmins,
                create: () => false,
                update: () => false,
            },
            admin: {
                hidden: true,
            },
            required: true,
        },
        {
            name: 'user',
            type: 'relationship',
            hasMany: false,
            admin: {
                hidden: true,
            },
            relationTo: 'users',
            required: true,
        },
        {
            name: 'products',
            type: 'relationship',
            relationTo: 'products',
            required: true,
            hasMany: true,
        },
    ],
}
