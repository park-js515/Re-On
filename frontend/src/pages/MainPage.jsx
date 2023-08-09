// import React from 'react';
// import { useLottie } from 'lottie-react';
// import animationData from '../assets/animation/animationlogo';
// import { SContainer } from '../components/home/styles';
// import Typing from '../components/Typing/index';
// import Test from '../components/home/Test';
// import Homepage from '../components/home/HomePage';
// import Banner from '../components/home/Banner';
// import { Container } from '@mui/system';

// import axios from 'axios';

// const Home = () => {
//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: 'xMidYMid slice',
//     },
//   };

//   const { View } = useLottie(defaultOptions);

//   const APPLICATION_SERVER_URL =
//     process.env.NODE_ENV === 'production' ? '' : 'https://i9c203.p.ssafy.io/';

//   const handleTest = async () => {
//     const response = await axios.get(APPLICATION_SERVER_URL + 'api/test/');
//     console.log(response);
//   };

//   return (
//     <div>
//     <SContainer>
//       <section className="main__section">
//         <div>
//           <div className="main__content">
//             <h3>친구들과</h3>
//             <h3>집에서 즐겨요</h3>
//             <h1>RE:ON</h1>

        
//           </div>
//         </div>
//         <div className="lottie-container">{View}</div>
//       </section>
//       <Typing typingContent="명인, 인쓰, 명인쓰" />
//       {/* <Banner />
//       <div
//       style={{
//         backgroundColor: '#f8f8f8',
//         paddingTop: '30px',
//         borderRadius: '20% 20% 0 0',
//       }}
//       >
//       <div>
//       <Container>
//       <Homepage />
//       </Container>
//       </div>
//     </div> */}
//     </SContainer>
//     <Test/>
//     </div>
//   );
// };

// export default Home;
import { useLottie } from 'lottie-react';
import animationData from '../assets/animation/animationlogo'
import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import Slide1 from '../components/home/Slide1'
import Test from '../components/home/Test'
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

        <SwiperSlide className="bg-gradient-to-t from-begie to-lightBlue relative">
          <img src="/image/face/희창.png" alt="" className="w-full h-full" />
          <h1 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-4xl md:text-5xl lg:text-6xl m-0">두꺼비</h1>
      </SwiperSlide>

     
       
      </Swiper>
    </>
  );
}



