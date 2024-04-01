declare namespace NodeJS {
    export interface ProcessEnv {
        NEXT_PUBLIC_SERVER_URL: string
        PORT: string
        PAYLOAD_SECRET: string
        MONGODB_URL: string
        NEXT_PUBLIC_SERVER_URL: string
        RESEND_API_KEY: string
        STRIPE_SECRET_KEY: string
        STRIPE_SHIPPING_FEE_PRICE_ID: string
        STRIPE_TRANSACTION_FEE_PRICE_ID: string
    }
}
