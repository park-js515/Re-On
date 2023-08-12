import React,{ useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Videoitem from "./Videoitem";
import { searchTop10Post } from "apiList/post";

const Hotlist = ({injectPostId, changeShow}) => {
  const sliderRef = useRef(null);
  // 실질 데이터는 API 완성 후 axios로
  const [data, setData] = useState([])
  // 테스트 데이터

  const addData = () => {
    function success(response) {
        const newdata = response.data.response
        setData((data)=>{return [...data,...newdata]})
    }
    function fail(error) {
        console.log(error)
    }
    searchTop10Post(success,fail)
  }

  useEffect(()=>{
    addData();
    return () => {
      setData([]);
    }
  },[])

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

  // 케러셀
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable : true,
    adaptiveHeight: true,
    autoplay: true,
    autoplaySpeed: 2000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />
  };

  return (
    <div className="bg-gradient-to-b from-lightBlue to-begie mb-16 py-0 sm:py-4">
      <div className="bg-white mx-auto max-w-7xl py-14 rounded">
      <h1 className="my-4 py-6 text-center font-bold text-3xl text-dark ">🎁인기영상</h1>
      <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
          <Slider className="py-4"ref={sliderRef} {...settings}>
              {data.map((item) => (
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
    </div>
  );
}

export default Hotlist;