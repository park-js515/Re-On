import React,{ useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Videoitem from "./Videoitem";
import { searchTop10Post } from "apiList/post";

const Hotlist = () => {

  const type = "AllPublic"
  const sliderRef = useRef(null);
  let ignore = false;
  const [data, setData] = useState([]);
  useEffect(() => {

    // 최초 렌더링 시에만 실행
    if (!ignore){
      searchTop10Post(
        (response) => {
          const newdata = response.data.response;
          console.log(newdata)
          setData(prevData => [...prevData, ...newdata]);
        },
        (error) => {
        }
      );
    }

    // 컴포넌트가 언마운트되면 데이터 삭제
    return () => {
      ignore = true;
    };
  }, []);

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
    <div className="bg-gradient-to-b from-lightBlue to-begie mb-12 py-16">
      <div className="bg-white bg-opacity-50 mx-auto max-w-7xl py-14 rounded-lg">
      <h1 className="my-4 py-6 text-center font-bold text-3xl text-dark ">🎁인기영상</h1>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Slider className="py-4 "ref={sliderRef} {...settings}>
              {data.map((item) => (
                  <div key={item.id}>
                      <Videoitem
                      
                          props={item}
                          type={type}
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