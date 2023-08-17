import React from "react";
import { useState } from "react";
import Videoplayer from "./Videoplayer";
const alter_img_url = process.env.REACT_APP_ALTER_IMG_URL

const convertToK = (number) => {
    if (number >= 1000){
        const front = Math.floor(number/1000)
        const back = Math.floor(Math.floor(number%1000)/100)
        return front + '.' + back + 'k'
    }
    else{
        return number ? number : 0
    }
}

const Videoitem = ({props, type, delItem}) => {
    const moveToMyPage = (event) => {
        event.preventDefault();
        window.location.assign("/mypage/"+props.email)
    }
    const [data, setData] = useState(props)
    const [show, setShow] = useState(false)
    const changeShow = ()=>{setShow((show)=>{return !show})}
    const [isLike, setIsLike] = useState(props.isLike);
    const [likeCnt, setLikeCnt] = useState(props.likeCnt)
    const year = props.createDate.substr(0,4);
    const month = props.createDate.substr(5, 2);
    const day = props.createDate.substr(8,2);
    const changeLike = ()=>{
      if (isLike){
        setLikeCnt((likeCnt)=>{return likeCnt-1})
      }
      else {
        setLikeCnt((likeCnt)=>{return likeCnt+1})
      }
      setIsLike((isLike)=>{return !isLike})
    }
    return (
      <>
      {show && <Videoplayer post_id={data.id} changeShow={changeShow} type={type} changeLike={changeLike} delItem={delItem}/>}
      <div className="bg-white flex max-w-xl rounded shadow-md flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg mx-2 my-4 pb-4">
        {/* 배경 투명으로 하기위해 inset0 포인터이벤트 없음 */}
        <div className="absolute inset-0 bg-current bg-opacity-50 hover:cursor-pointer pointer-events-none"></div>
        {/* 상단 프로필, 년월일 닉넴 */}
        <div className="relative mt-2 flex items-center justify-between w-full gap-x-4 mb-1 px-1">
          {/* 상단 프로필, 년월일 닉넴 */}
          {/* 마이페이지 공개 조회는 프로필 X */}
          {type === "Likes" || type==="AllPublic" ? 
            <div className="flex items-center gap-x-4 ml-2">
              <img src={props.profileImg ? "https://storage.googleapis.com/reon-bucket/" + props.profileImg : alter_img_url} alt="" onClick={moveToMyPage} className="h-10 w-10 rounded-full bg-gray-50 hover:cursor-pointer" />
              <div className="text-sm leading-6">
                <p className="font-semibold text-gray-900">
                  <span className="text-xs hover:underline hover:decoration-solid hover:cursor-pointer" onClick={moveToMyPage}>{props.nickName}</span>
                </p>
              </div>
            </div>
          : null}
          
          <div className="text-sm leading-6 text-gray-700 font-semibold">
            {year}년 {month}월 {day}일
          </div>
        </div>
        {/* 썸넬 */}
        <img className="w-full h-64 bg-cover bg-center featured-item cursor-pointer " src={ "https://storage.googleapis.com/reon-bucket/" + props.thumbnail } alt="" onClick={changeShow}></img>
    
        {/* 좋아요 */}
        {type !== "Private" ?
            <div className="flex items-center gap-x-4 text-xs ml-2 ">
              <div className="">
                <span className="text-xl">{isLike ? "❤️" : "🖤"}</span> {convertToK(likeCnt)}
              </div>
              <div className="relative z-10 rounded-full bg-gray-50 px-3 py-3 font-medium text-gray-600 hover:bg-gray-100">
                <span className="text-xl">💬</span> {convertToK(props.commentCnt)}   
              </div>
            </div>
        : null }
            <div className="group relative ml-2 w-full">
              <h3 className="p-1 mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600 truncate">  
                <span className="w-full text-2xl hover:underline hover:decoration-solid hover:cursor-pointer" onClick={changeShow}>{props.title}</span>
              </h3>
            </div>
      </div>
      </>
    );
    
  }
export default Videoitem
