import React,{ useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Videoitem from "./Videoitem";

const Hotlist = ({injectPostId, changeShow}) => {
  // 실질 데이터는 API 완성 후 axios로
  const sliderRef = useRef(null);
  // 테스트 데이터
  let TESTDATA = []
  for (let i = 1; i <= 10; i++){
    TESTDATA.push({
      post_id : i,
      thumbnail : 'https://source.unsplash.com/random?sig=2',
      member_id : i,
      nick_name : `랄로상-${i}`,
      profile_img : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
      title : `어쩌라고-${i}`,
      like_cnt : 2400,
      comment_cnt : 20,
    })
    }
    const NextArrow = ({ onClick }) => (
      <img
        src="/image/face/next-arrow.png"
        alt="다음"
        className="slick-next"
        onClick={onClick}
      />
    );
  
    const PrevArrow = ({ onClick }) => (
      <img
        src="/image/face/pre-arrow.png"
        alt="이전"
        className="slick-prev" 
        onClick={onClick}
      />
    );
  
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      draggable : true,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 1500,
      nextArrow: <NextArrow />,
      prevArrow: <PrevArrow />
    };

  return (
    <div className="bg-inss my-4 py-12 sm:py-16 ">
      <h1 className="my-4 py-8 text-center font-bold text-3xl text-dark ">🎁인기영상</h1>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <Slider ref={sliderRef} {...settings}>
              {TESTDATA.map((item) => (
                  <div key={item.video_id}>
                      <Videoitem
                          props={item}
                          changeMode={() => {
                              injectPostId(item.video_id);
                              changeShow();
                          }}
                      />
                  </div>
              ))}
          </Slider>
      </div>
    </div>
  );
}

export default Hotlist;