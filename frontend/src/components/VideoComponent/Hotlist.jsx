import React from "react";
import Videoitem from "./Videoitem";

const Hotlist = ({injectPostId, changeShow}) => {
  // 실질 데이터는 API 완성 후 axios로

  // 테스트 데이터
  let TESTDATA = []
  for (let i = 1; i <= 10; i++){
    TESTDATA.push({
      post_id : i,
      thumbnail : "https://i.ytimg.com/vi/PJSH-r7uPfo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCP2xrC0yhdf70ORJ37lHEpZAPWCA",
      member_id : i,
      nick_name : `랄로상-${i}`,
      profile_img : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
      title : `어쩌라고-${i}dfasdfasdfasdgsagasdgsadfasddfasdfasd`,
      like_cnt : 2400,
      comment_cnt : 20,
    })
  }

  return (
    <div className="">
      <h3 className="my-4 text-center font-bold text-3xl text-info">이달의 인기영상</h3>
      <div className="mx-auto flex overflow-x-scroll items-bw">
          {TESTDATA.map((item)=>{
            return (
                <Videoitem
                  key={item.video_id}
                  props={item}
                  changeMode={()=>{
                    injectPostId(item.video_id)
                    changeShow()
                  }}
                />
            )
          })}
      </div>
    </div>
  )
}

export default Hotlist;