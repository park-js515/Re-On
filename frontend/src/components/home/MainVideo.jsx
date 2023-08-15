import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination } from 'swiper/modules';

// MainVideo 컴포넌트는 비디오 컨텐츠
function MainVideo({ videoId  }) {
const youtubeEmbedLink = `https://www.youtube.com/embed/${videoId}`;
  return (
    <div className="video-slide -mt-56">

       <iframe
        width="100%"
        height="100%"
        src={youtubeEmbedLink}
        title="YouTube video player"
        frameborder="10"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default function App() {
  return (
    <div className="swiper"> {/* 부모 컨테이너 */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: -100,
          depth: 50,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={true}
        modules={[EffectCoverflow, Pagination]}
        className="mySwiper"
      >
        <SwiperSlide>
          <MainVideo videoId="2PE_Ql5l-vE" />
        </SwiperSlide>
        <SwiperSlide>
          <MainVideo videoId="W_tbwbGU_Qs" />
        </SwiperSlide>
        <SwiperSlide>
          <MainVideo videoId="nu4MGhr4COo" />
        </SwiperSlide>
        <SwiperSlide>
          <MainVideo videoId="nIm-yyATZcI" />
        </SwiperSlide>
      
      </Swiper>
    </div>
  );
}