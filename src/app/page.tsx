import { MaxWidthWrapper } from '@/components/MaxWidthWrapper'
import { ProductReel } from '@/components/ProductReel'
import { Button, buttonVariants } from '@/components/ui/button'
import { CheckCircle, Gauge, Leaf } from 'lucide-react'
import Link from 'next/link'

const perks = [
    {
        name: 'Fast delivery',
        Icon: Gauge,
        description:
            'Get you product deliver as fast as possible without problems.',
    },
    {
        name: 'High Quality',
        Icon: CheckCircle,
        description:
            'High quality products verified by our team to ensure you are getting only the best.',
    },
    {
        name: 'For the planet',
        Icon: Leaf,
        description:
            "We've commited to create as little polution as possible and to donate 1% of profits to preservation and restoration of natural environment.",
    },
]

export default function Home() {
    return (
        <>
            <MaxWidthWrapper>
                <div className="mx-auto flex max-w-3xl flex-col items-center py-20 text-center ">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl ">
                        Your marketplace for high-quality{' '}
                        <span className="text-primary">products</span>.
                    </h1>
                    <p className="mt-6 max-w-prose text-lg text-muted-foreground">
                        Welcome to{' '}
                        <span className="text-primary">BrandName</span>. Every
                        product on our platform is verified by our team to
                        ensure the highest quality standards.
                    </p>
                    <div className="mt-6 flex flex-col gap-4 sm:flex-row">
                        <Link href="/products" className={buttonVariants({})}>
                            Brows Trending
                        </Link>
                        <Button variant="ghost">
                            Our quality pormise &rarr;
                        </Button>
                    </div>
                </div>
                <ProductReel
                    title={'Brand new'}
                    subtitle="This is the subtitle"
                    href="/products"
                    query={{ sort: 'desc', limit: 4 }}
                />
            </MaxWidthWrapper>

            <section className="border-t border-gray-50 bg-gray-50">
                <MaxWidthWrapper className="py-20">
                    <div className="grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-6 lg:grid-cols-3 lg:gap-x-10 lg:gap-y-0">
                        {perks.map((perk) => {
                            return (
                                <div
                                    key={perk.name}
                                    className="text-center md:flex md:items-start md:text-left lg:block lg:text-center"
                                >
                                    <div className="flex justify-center md:flex-shrink-0">
                                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50  text-primary">
                                            {
                                                <perk.Icon className="h-1/3 w-1/3" />
                                            }
                                        </div>
                                    </div>
                                    <div className="mt-6 md:ml-4 md:mt-0 lg:ml-0 lg:mt-6">
                                        <h3 className="text-base font-medium text-gray-900">
                                            {perk.name}
                                        </h3>
                                        <p className="mt-3 text-sm text-muted-foreground">
                                            {perk.description}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </MaxWidthWrapper>
            </section>
        </>
    )
}
