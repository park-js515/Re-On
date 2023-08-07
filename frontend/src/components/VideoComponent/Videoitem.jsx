import React from "react";
import { useNavigate } from "react-router-dom";

const convertToK = (number) => {
    if (number >= 1000){
        const front = Math.floor(number/1000)
        const back = Math.floor(Math.floor(number%1000)/100)
        return front + '.' + back + 'k'
    }
    else{
        return number
    }
}

const Videoitem = ({props, changeMode}) => {
    const navigate = useNavigate();
    const moveToMyPage = (event) => {
        event.preventDefault();
        navigate('/mypage')
    }
    
    return (
      <div className="flex max-w-xl shadow-md flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg mx-2 ">
        <div style={{ backgroundImage: `url(${props.thumbnail})` }}  className="w-full h-48 bg-cover bg-center rounded-t" src={props.thumbnail} alt=""  onClick={changeMode}></div>
        
        <div className="flex items-center gap-x-4 text-xs ml-2">
          <div className="text-gray-500">
            ❤ {convertToK(props.like_cnt)}
          </div>
          <div className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100">
            💬 {convertToK(props.comment_cnt)}
          </div>
        </div>
        
        <div className="group relative ml-2">
          <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
          <span className="text-sm hover:underline hover:decoration-solid hover:cursor-pointer" onClick={changeMode}>{props.title}</span>
          </h3>
        </div>
        
        <div className="relative mt-8 flex items-center gap-x-4 ml-2 mb-1">
          <img src={props.profile_img} alt="" onClick={moveToMyPage} className="h-10 w-10 rounded-full bg-gray-50" />
          <div className="text-sm leading-6">
            <p className="font-semibold text-gray-900">
             <span className="text-xs hover:underline hover:decoration-solid hover:cursor-pointer" onClick={moveToMyPage}>{props.nick_name}</span>
            </p>
          </div>
        </div>
      </div>
    );
  }
export default Videoitem
