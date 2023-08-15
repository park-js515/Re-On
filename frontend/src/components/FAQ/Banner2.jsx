import styles from "./Banner.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "@emotion/styled";


const StyledSlider = styled(Slider)`
  height: 100%;
  width: 100%;
  position: relative;
  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  // dots
  .slick-dots {
    bottom: 48px;

    li {
      margin: 0;

      button {
        width: 100%;
        height: 100%;
        padding: 0;
      }
    }
  }
`;

const Pre = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  left: 2%;
  z-index: 3;
`;

const NextTo = styled.div`
  width: 30px;
  height: 30px;
  position: absolute;
  right: 2%;
  z-index: 3;
`;

function Banner2() {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // nextArrow: (
    //   <NextTo>
    //     <img src="/image/face/next-arrow.png" 
    //     alt='이전'/>
    //   </NextTo>
    // ),
    // prevArrow: (
    //   <Pre>
    //     <img src="/image/face/pre-arrow.png"
    //     alt="이전" />
    //   </Pre>
    // ),
  };
  return (
    <div>
      <StyledSlider {...settings}>
        <div className={styles.margin}>
          <img
            className={styles.img}
            src="/image/team/배너2.png"
            alt="배너1"
          />
        </div>
        <div className={styles.margin}>
          <img
            className={styles.img}
            src="/image/team/배너2.png"
            alt="배너2"
          />
        </div>
        <div className={styles.margin}>
          <img
            className={styles.img}
            src="/image/team/배너2.png"
            alt="배너3"
          />
        </div>
      </StyledSlider>
    </div>
  );
}
export default Banner2;
