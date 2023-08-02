import React from "react";
import { useLottie } from "lottie-react";
import animationData from '../assets/animation/animationlogo';
import { SContainer } from "./styles";
import Typing from "../components/Typing/index";
import Homepage from "../components/home/HomePage"

const Home = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const { View } = useLottie(defaultOptions);

  return (
    <SContainer>
      <section className="main__section">
        <div>
          <div className="main__content">
            <h3>됬다리</h3>
            <h3>희창이 얼굴 두꺼비</h3>
            <h1>카멜레온 헤헤</h1>
            <h4>#실시간 &nbsp;#연기 &nbsp;#플랫폼 &nbsp;#AI</h4>
            <h4>#친구들과 즐겨요 &nbsp;#희창시치</h4>
          </div>
        </div>
        <div className="lottie-container">
          {View}
        </div>
      </section>
      <Typing />
      <div
        style={{
          backgroundColor: "#f8f8f8",
          paddingTop: "30px",
          borderRadius: "20% 20% 0 0",
        }}
      >
      <Homepage/>
      </div>
    </SContainer>
  );
};

export default Home;
