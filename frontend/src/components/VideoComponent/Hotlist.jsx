import React from "react";
import Videoitem from "./Videoitem";
import Slider from "react-slick";
import styled from "@emotion/styled";

const Hotlist = ({injectVideoID, changeShow}) => {
  // 실질 데이터는 API 완성 후 axios로

  // 테스트 데이터
  let TESTDATA = []
  for (let i = 1; i <= 10; i++){
    TESTDATA.push({
      video_id : i,
      thumbnail_url : "https://i.ytimg.com/vi/PJSH-r7uPfo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCP2xrC0yhdf70ORJ37lHEpZAPWCA",
      author_id : i,
      author : `랄로상-${i}`,
      profile_url : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
      title : `어쩌라고-${i}dfasdfasdfasdgsagasdgsadfasddfasdfasd`,
      like_cnt : 2400,
      comments_cnt : 20,
      isLike : (i % 2 === 0 ? true : false)
    })
  }
  
  const Pre = styled.div`
  width: 50px;
  height: 50px;
  position: absolute;
  left: 2%;
  z-index: 3;
  `;

  const NextTo = styled.div`
    width: 50px;
    height: 50px;
    position: absolute;
    right: 2%;
    z-index: 3;
  `;

  const settings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    nextArrow: (
      <NextTo>
      </NextTo>
    ),
    prevArrow: (
      <Pre>
      </Pre>
    ),
    draggable: false,
  };
  return (
    <div className="">
      <h3 className="my-4 text-center font-bold text-3xl text-info">이달의 인기영상</h3>
      <div className="mx-auto">
        <Slider {...settings} className="mx-auto">
            {TESTDATA.map((item,idx)=>{
              return (
                <div className="mx-1" key={idx}>
                  <Videoitem
                    key={item.video_id}
                    props={item}
                    changeMode={()=>{
                      injectVideoID(item.video_id)
                      changeShow()
                    }}
                  />
                </div>
              )
            })}
        </Slider>
      </div>
    </div>
  )
}

export default Hotlist;