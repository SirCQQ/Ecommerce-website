import { type ClassValue, clsx } from 'clsx'
import { Access } from 'payload/config'
import { FieldAccess } from 'payload/types'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatPrice(
    price: number | string,
    options: {
        currency?: 'USD' | 'EUR' | 'GBP' | 'BDT'
        notation?: Intl.NumberFormatOptions['notation']
    } = {}
) {
    const { currency = 'USD', notation = 'compact' } = options
    const numericPrice = typeof price === 'string' ? parseFloat(price) : price

    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency,
        notation,
        maximumFractionDigits: 2,
    }).format(numericPrice)
}

export const colletionAccessOnlyAdmins: Access = ({ req: { user } }) => {
    return user.role === 'admin'
}
export const fiedlAccessOnlyAdmins: FieldAccess = ({ req: { user } }) => {
    return user.role === 'admin'
}
