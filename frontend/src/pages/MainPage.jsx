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

import React, { useRef, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import './styles.css';
import Slide1 from '../components/home/Slide1'
import Test from '../components/home/Test'
// import required modules
import { Mousewheel, Pagination } from 'swiper/modules';


export default function MainPage() {
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
        <SwiperSlide className="bg-gradient-to-tl from-begie to-lightBlue flex flex-col">
            <Test/>
            <Slide1/>
        </SwiperSlide>
        <SwiperSlide><Test/></SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
       
      </Swiper>
    </>
  );
}
