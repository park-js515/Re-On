import React from "react";
import { useNavigate } from "react-router-dom";

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

const Videoitem = ({props, changeMode}) => {
    const navigate = useNavigate();
    const moveToMyPage = (event) => {
        event.preventDefault();
        navigate(`/mypage/${props.email}`)
    }
    
    const date = new Date(props.createDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return (
      <div className="bg-white flex max-w-xl rounded shadow-md flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg mx-2 my-4 pb-4">
        {/* 배경 투명으로 하기위해 inset0 포인터이벤트 없음 */}
        <div className="absolute inset-0 bg-current bg-opacity-50 hover:cursor-pointer pointer-events-none"></div>
        {/* 상단 프로필, 년월일 닉넴 */}
        <div className="relative mt-2 flex items-center justify-between w-full gap-x-4 mb-1 px-1">
          <div className="flex items-center gap-x-4 ml-2">
            <img src={props.profileImg} alt="" onClick={moveToMyPage} className="h-10 w-10 rounded-full bg-gray-50 hover:cursor-pointer" />
            <div className="text-sm leading-6">
              <p className="font-semibold text-gray-900">
                <span className="text-xs hover:underline hover:decoration-solid hover:cursor-pointer" onClick={moveToMyPage}>{props.nickName}</span>
              </p>
            </div>
          </div>
          <div className="text-sm leading-6 text-gray-700 font-semibold">
            {year}년 {month}월 {day}일
          </div>
        </div>
        {/* 썸넬 */}
        <div className="w-full h-64 bg-cover bg-center featured-item cursor-pointer " src={props.thumbnail} alt="" onClick={changeMode}></div>
    
        {/* 좋아요 */}
        <div className="flex items-center gap-x-4 text-xs ml-2 ">
          <div className="">
            <span className="text-xl">{props.isLike ? "💙" : "🖤"}</span> {convertToK(props.likeCnt)}
          </div>
          <div className="relative z-10 rounded-full bg-gray-50 px-3 py-3 font-medium text-gray-600 hover:bg-gray-100">
            <span className="text-xl">💬</span> {convertToK(props.commentCnt)}   
          </div>
        </div>

        {/* 제목 */}
        <div className="group relative ml-2">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
            <span className="text-2xl hover:underline hover:decoration-solid hover:cursor-pointer" onClick={changeMode}>{props.title}</span>
          </h3>
        </div>
        
      </div>
    );
    
  }
export default Videoitem
