import { PrimaryActionEmailHtml } from '../components/emails/PrimaryActionEmail'
import { colletionAccessOnlyAdmins } from '../lib/utils'
import { Access, CollectionConfig } from 'payload/types'

const adminOrUser: Access = async ({ req: { user } }) => {
    if (user.role) {
        return true
    }
    return {
        id: { equals: user.id },
    }
}

export const Users: CollectionConfig = {
    slug: 'users',
    auth: {
        verify: {
            generateEmailHTML: ({ token }) => {
                return PrimaryActionEmailHtml({
                    actionLabel: 'Verify your accound',
                    buttonText: 'Verify Accound',
                    href: `${process.env.NEXT_PUBLIC_SERVER_URL}/verify-email?token=${token}`,
                })
            },
        },
    },
    access: {
        read: adminOrUser,
        create: () => true,
        update: colletionAccessOnlyAdmins,
        delete: colletionAccessOnlyAdmins,
    },
    admin: {
        hidden: ({ user }) => user.role !== 'admin',
        defaultColumns: ['id'],
    },
    fields: [
        {
            name: 'products',
            label: 'Products',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'products',
            hasMany: true,
        },
        {
            name: 'product_files',
            label: 'Products Files',
            admin: {
                condition: () => false,
            },
            type: 'relationship',
            relationTo: 'product_files',
            hasMany: true,
        },

        {
            name: 'role',
            type: 'select',
            defaultValue: 'user',
            required: true,

            options: [
                {
                    label: 'Admin',
                    value: 'admin',
                },
                {
                    label: 'User',
                    value: 'user',
                },
            ],
        },
    ],
}
