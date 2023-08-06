import React from 'react';
import { useLottie } from 'lottie-react';
import animationData from '../assets/animation/animationlogo';
import { SContainer } from '../components/home/styles';
import Typing from '../components/Typing/index';
import Homepage from '../components/home/HomePage';
import Banner from '../components/home/Banner';
import { Container } from '@mui/system';

import axios from 'axios';

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const { View } = useLottie(defaultOptions);

  const APPLICATION_SERVER_URL =
    process.env.NODE_ENV === 'production' ? '' : 'https://i9c203.p.ssafy.io/';

  const handleTest = async () => {
    const response = await axios.get(APPLICATION_SERVER_URL + 'api/test/');
    console.log(response);
  };

  return (
    <SContainer>
      <section className="main__section">
        <div>
          <div className="main__content">
            <h3>됬다리</h3>
            <h3>희창이 얼굴 두꺼비</h3>
            <h1>희창이</h1>
            <h4>#실시간 &nbsp;#연기 &nbsp;#플랫폼 &nbsp;#AI</h4>
            <h4>#친구들과 즐겨요 &nbsp;#희창시치</h4>
            <button onClick={handleTest}>####버튼####</button>
          </div>
        </div>
        <div className="lottie-container">{View}</div>
      </section>
      <Typing typingContent="명인, 인쓰, 명인쓰" />
      <Banner />
      <div
        style={{
          backgroundColor: '#f8f8f8',
          paddingTop: '30px',
          borderRadius: '20% 20% 0 0',
        }}
      >
        <div>
          <Container>
            <Homepage />
          </Container>
        </div>
      </div>
    </SContainer>
  );
};

export default Home;
