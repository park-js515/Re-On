
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
import { Link } from 'react-router-dom';
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
            <section className="main__section flex justify-center items-center">
              <div className="bg-[#fff] bg-opacity-30 shadow-2xl py-0 rounded-lg text-center flex w-full h-1/2 max-w-screen-2xl mt-32">
                  
                  {/* 왼쪽 텍스트 부분 */}
                  <div className="flex-1 py-24 my-22 ml-12 mt-28">
                      <h1 className="text-4xl font-semibold md:text-5xl lg:text-6xl m-0 mt-1 mb-8 text-black">RE:ON 무엇인가요?</h1>
                      <h3 className="text-2xl font-semibold m-0 mt-2 text-white">AI 학습을 통하여 사용자의 표정과 연기를 인식합니다.</h3>
                      <h3 className="text-2xl font-semibold m-0 mt-2 text-white">표정의 미묘한 변화, 감정의 진실성까지 분석하여 </h3>
                      <h3 className="text-2xl font-semibold m-0 mt-2 text-white">정확한 연기 점수를 제공해드립니다.</h3>
                      <Link to="/team">

                        <button 
                          className="bg-info text-white px-2 mt-10 py-4 rounded hover:bg-lightBlue ml-0 mr-0 w-96 text-2xl hover:scale-105 ">
                          팀문화 바로가기
                      </button>
                      </Link>
                      
                  </div>

                  {/* 오른쪽 {View} 부분 */}
                  <div className="lottie-container flex-1 flex justify-center items-center ">
                      {View}
                  </div>
              </div>
          </section>

        </SwiperSlide>

        <SwiperSlide className={`bg-gradient-to-t from-begie to-lightBlue ${activeIndex === 2 ? "fade-in" : ""}`}>
      
        <h1 className="absolute top-20 left-1/2 transform -translate-x-1/2 text-black font-semibold text-6xl ">🔥인기영상</h1>
        <section className="main__section flex justify-center items-center ">
            <div className="bg-[#fff] bg-opacity-30 shadow-2xl py-0 px-40 rounded-lg text-center w-full max-w-screen-2xl mt-96">
              <h3 className="text-2xl font-semibold mt-4 text-white">슬라이드 해보세요!</h3>
              <MainVideo className=""/>
            </div>
        </section>
        
        </SwiperSlide>

     
       
      </Swiper>
    </>
  );
}



