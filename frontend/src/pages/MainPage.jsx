
import { useLottie } from 'lottie-react';
import animationData from '../assets/animation/animationlogo'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import Slide1 from '../components/home/Slide1'
import Test from '../components/home/Test'
import Curtain from '../components/home/Curtain'
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';

export default function MainPage() {
  const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };
  const { View } = useLottie(defaultOptions);
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
        
        allowTouchMove ={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination]}
        
      >
        
          <SwiperSlide className="bg-gradient-to-t from-begie to-lightBlue flex flex-col ">      
                <Curtain/>
                <Slide1/>
                <Test/>

            
                
          </SwiperSlide>

          <SwiperSlide className="bg-gradient-to-t from-lightBlue to-begie">
            <section className="main__section flex justify-center items-center ml-32">
                <div>
                    <div>
                        {/* <h3 className="text-2xl md:text-3xl lg:text-4xl leading-10 m-0">오늘 친구들과</h3> */}
                        {/* <h3 className="text-2xl md:text-3xl lg:text-4xl leading-10 m-0">RE:ON에서 연기한판 </h3> */}
                        <h1 className="text-4xl md:text-5xl lg:text-6xl m-0 mt-1 mb-8">어떤디?????</h1>
                        <h3 className="text-2xl md:text-3xl lg:text-4xl leading-10 m-0">호우호우호우 </h3>
                        {/* <h4 className="text-sm md:text-base lg:text-lg leading-6 m-0 text-gray-400">#실시간 &nbsp;#연기 &nbsp;#플랫폼 &nbsp;#AI</h4>
                        <h4 className="text-sm md:text-base lg:text-lg leading-6 m-0 text-gray-400">#친구들과 즐겨요 &nbsp;#희창시치</h4> */}
                    </div>
                </div>
                <div className="lottie-container  md:ml-4 lg:ml-8 md:pl-6 lg:pl-8 w-[calc(4vw+400px)] md:w-[calc(6vw+600px)] lg:w-[calc(8vw+800px)]">
                    {View}
                </div>
            </section>
        </SwiperSlide>

        <SwiperSlide className="bg-gradient-to-t from-begie to-lightBlue">
          <img src="https://source.unsplash.com/random/?nature,landscape" alt="Random Nature Landscape"  />
        </SwiperSlide>

     
       
      </Swiper>
    </>
  );
}



