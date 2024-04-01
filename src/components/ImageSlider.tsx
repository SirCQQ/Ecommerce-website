'use client'
import Image from 'next/image'
import React, { FC, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import type SwiperType from 'swiper'
import { Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import { cn } from '@/lib/utils'
import { ChevronLeft, ChevronRight } from 'lucide-react'

type ImageSliderProps = {
    urls: string[]
}
export const ImageSlider: FC<ImageSliderProps> = ({ urls }) => {
    const [swiper, setSwiper] = useState<null | SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)

    const [slideConfig, setSlideConfig] = useState<{
        isBeginning: boolean
        isEnd: boolean
    }>({
        isBeginning: true,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
    })

    useEffect(() => {
        swiper?.on('slideChange', ({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (urls.length ?? 0) - 1,
            })
        })
    }, [swiper, urls])

    const activeStyle =
        'active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translatey-1/2 aspect-square size-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300'

    const inactiveStyle = 'hidden text-gray-400'

    return (
        <div className="group relative aspect-square overflow-hidden rounded-xl bg-zinc-100">
            <div className="absolute inset-0 z-10 opacity-0 transition group-hover:opacity-100">
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        swiper?.slideNext()
                    }}
                    className={cn(activeStyle, 'right-3 transition', {
                        [inactiveStyle]: slideConfig.isEnd,
                        'hover:bg-primary-300 text-primary-800 opacity-100':
                            !slideConfig.isEnd,
                    })}
                    aria-label="next image"
                >
                    <ChevronRight className="size-4 text-zinc-700" />
                </button>
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        swiper?.slidePrev()
                    }}
                    className={cn(activeStyle, 'left-3 transition', {
                        [inactiveStyle]: slideConfig.isBeginning,
                        'hover:bg-primary-300 text-primary-800 opacity-100':
                            !slideConfig.isBeginning,
                    })}
                    aria-label="previous image"
                >
                    <ChevronLeft className="size-4 text-zinc-700" />
                </button>
            </div>
            <Swiper
                onSwiper={(swiper) => {
                    setSwiper(swiper)
                }}
                className="size-full"
                spaceBetween={50}
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{
                    renderBullet: (_, className) =>
                        `<span class="rounded-full transition ${className}"></span>`,
                }}
            >
                {urls.map((url, index) => (
                    <SwiperSlide
                        key={`product-image-${index}`}
                        className="relative -z-10 size-full"
                    >
                        <Image
                            fill
                            loading="eager"
                            className="-z-10 size-full object-cover object-center"
                            src={url}
                            alt="Product image"
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}
