import { cn } from '@/lib/utils'
import { Loader2, LucideProps } from 'lucide-react'
import React from 'react'

export const Loader = ({ className, ...props }: LucideProps) => {
    return (
        <Loader2
            className={cn(
                ' size-full animate-spin text-muted-foreground',
                className
            )}
            {...props}
        />
    )
}
