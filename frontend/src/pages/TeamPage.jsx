import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import { Mousewheel, Pagination } from 'swiper/modules';

export default function TeamPage() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleSlideChange = (swiper) => {
        setActiveIndex(swiper.activeIndex);
    };

    return (
        <>
            <Swiper
                direction={'vertical'}
                slidesPerView={1}
                spaceBetween={0}
                speed={1500}
                mousewheel={{
                    sensitivity: 0.5,
                    releaseOnEdges: true
                }}
                allowTouchMove={true}
                pagination={{
                    clickable: true,
                }}
                modules={[Mousewheel, Pagination]}
                onSlideChange={handleSlideChange}
            >
                <SwiperSlide>
                    <img className="fade-in" src="/image/team/6.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className={activeIndex === 1 ? "fade-in" : ""} src="/image/team/5.png" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img className={activeIndex === 2 ? "fade-in" : ""} src="/image/team/4.png" alt="" />
                </SwiperSlide>
            </Swiper>
        </>
    );
}
