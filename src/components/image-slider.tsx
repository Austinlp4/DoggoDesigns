'use client';

import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';
import type SwiperType from 'swiper';
import { Pagination } from 'swiper/modules';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ImageSliderProps {
    urls: string[];
}

export const ImageSlider = ({
    urls
}: ImageSliderProps) => {
    const [swiper, setSwiper] = useState<null | SwiperType>(null)
    const [activeIndex, setActiveIndex] = useState(0)
    const [slideConfig, setSlideConfig] = useState({
        isBeginning: true,
        isEnd: activeIndex === (urls.length ?? 0) - 1,
    })

    useEffect(() => {
        swiper?.on("slideChange", ({ activeIndex }) => {
            setActiveIndex(activeIndex);
            setSlideConfig({
                isBeginning: activeIndex === 0,
                isEnd: activeIndex === (urls.length ?? 0) - 1,
            });
        })
    }, [swiper, urls])

    const activeStyles = "active:scale-[0.97] grid opacity-100 hover:scale-105 absolute top-1/2 -translate-y-1/2 aspect-square size-8 z-50 place-items-center rounded-full border-2 bg-white border-zinc-300"

    const inactiveStyles = "hidden text-gray-400"

    return (
        <div className="group relative bg-zinc-100 aspect-square overflow-hidden rounded-xl">
            <div className="absolute z-10 inset-0 opacity-0 group-hover:opacity-100 transition">
                <button 
                    className={cn(
                        activeStyles,
                        "right-3 transition",
                        {
                            [inactiveStyles]: slideConfig.isEnd,
                            "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isEnd
                        }
                    )}
                    aria-label="next image"
                    onClick={(e) => {
                        e.preventDefault();
                        swiper?.slideNext();
                    }}
                >
                    <ChevronRight className='size-4 text-zinc-700' />
                </button>
                <button 
                    className={cn(
                        activeStyles,
                        "left-3 transition",
                        {
                            [inactiveStyles]: slideConfig.isBeginning,
                            "hover:bg-primary-300 text-primary-800 opacity-100": !slideConfig.isBeginning
                        },
                    )}
                    aria-label="previous image"
                    onClick={(e) => {
                        e.preventDefault();
                        swiper?.slidePrev();
                    }}
                >
                    <ChevronLeft className='size-4 text-zinc-700' />
                </button>
            </div>

            <Swiper 
                className='w-full h-full'
                onSwiper={(swiper) => setSwiper(swiper)}
                spaceBetween={50}
                slidesPerView={1}
                modules={[Pagination]}
                pagination={{ renderBullet: (_, className) => {
                    return `<span class="rounded-full transition ${className}"></span>`
                } }}
            >
                {urls.map((url, index) => (
                    <SwiperSlide key={index} className='-z-10 relative h-full w-full'>
                        <Image 
                            fill
                            loading='eager'
                            className='-z-10 h-full w-full object-cover object-center'
                            src={url}
                            alt='Product image'
                            onError={(e) => {
                                console.error(`Error loading image: ${url}`, e);
                                // Optionally set a fallback image
                                // e.currentTarget.src = '/fallback-image.jpg';
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}