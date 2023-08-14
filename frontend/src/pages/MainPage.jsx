
import { useLottie } from 'lottie-react';
import animationData from '../assets/animation/animationlogo'
import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import Slide1 from '../components/home/Slide1'
import Test from '../components/home/Test'
import Curtain from '../components/home/Curtain'
import MainVideo from '../components/home/MainVideo'
import { Container } from '@mui/system';
// import required modules
import { Mousewheel, Pagination,Navigation} from 'swiper/modules';

export default function MainPage() {

 
  //로티
  const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      };
  const { View } = useLottie(defaultOptions);
  
  //스와이퍼

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
        navigation={true}
        mousewheel={{
          sensitivity: 0.5,
          releaseOnEdges: true
        }}
        allowTouchMove={true}
        pagination={{
          clickable: true,
        }}
        modules={[Mousewheel, Pagination,Navigation]}
      
        onSlideChange={handleSlideChange}
        
        
      >
      
    
      
          <SwiperSlide className="bg-gradient-to-t from-begie to-lightBlue flex flex-col">      
                <Curtain/>
                <Slide1/>
                <Test/>        
          </SwiperSlide>

          <SwiperSlide className="bg-gradient-to-t from-lightBlue to-begie" >
            <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-black font-semibold text-6xl ">📘about</h1>
            <section className="main__section flex justify-center items-center ml-36 mt-20">
                <div>
                  <div className="bg-[#fff] bg-opacity-30 shadow-2xl p-6 py-28 rounded-lg text-center">
                      
                      <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl m-0 mt-1 mb-8 text-black">RE:ON 무엇인가요?</h1>
                      <h3 className="text-2xl font-semibold m-0 mt-2 text-white">AI 기술을 사용하여 사용자의 표정과 연기를 인식합니다.</h3>
                      <h3 className="text-2xl font-semibold m-0 mt-2 text-white">표정의 미묘한 변화, 감정의 진실성까지 철저하게 분석하여 </h3>
                      <h3 className="text-2xl font-semibold m-0 mt-2 text-white">정확한 연기 점수를 제공해드립니다.</h3>
        
                  </div>
                </div>
                
                <div className="lottie-container  md:ml-0 lg:ml-0 md:pl-0 lg:pl-0 w-[calc(4vw+400px)] md:w-[calc(6vw+600px)] lg:w-[calc(8vw+800px)]">
                    {View}
                </div>
            </section>
        </SwiperSlide>

        <SwiperSlide className={`bg-gradient-to-t from-begie to-lightBlue ${activeIndex === 2 ? "fade-in" : ""}`}>
            <div>
              
            <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-black font-semibold text-6xl ">🔥인기영상</h1>
              <div className="">

                <MainVideo />
              </div>
     
            </div>
        
        </SwiperSlide>

     
       
      </Swiper>
    </>
  );
}



