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
        <div className="rounded-md border border-indigo-600 hover:bg-slate-100 w-64 h-56">
            <img className="rounded-t-md hover:cursor-pointer" src={props.thumbnail_url} alt=""  onClick={changeMode} width="100%"  height="50%"/>
            <div className="m-1">
                <div className="flex flex-row">
                    <img src={props.profile_url} alt="" onClick={moveToMyPage}
                    className="rounded-full w-2/12 h-1/6 hover:cursor-pointer"
                    />
                    <div className="ml-2 truncate">
                        <span className="text-sm hover:underline hover:decoration-solid hover:cursor-pointer" onClick={changeMode}>{props.title}</span><br />
                        <span className="text-xs hover:underline hover:decoration-solid hover:cursor-pointer" onClick={moveToMyPage}>{props.author}</span>
                    </div>
                </div>
                <div className="text-end">
                    {props.isLike ? "♥" : "♡"} {convertToK(props.like_cnt)} | comments {convertToK(props.comments_cnt)}
                </div>
            </div>
        </div>
    )
}

export default Videoitem