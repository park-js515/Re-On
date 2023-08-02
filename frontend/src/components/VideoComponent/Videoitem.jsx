import React, { useState } from "react";
import Videoplayer from "./Videoplayer";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const Videoitem = ({props}) => {
    const navigate = useNavigate();
    const [isShow, setIsShow] = useState(false)
    const moveToMyPage = (event) => {
        event.preventDefault();
        navigate('/mypage')
    }

    const showPlayer = (event) => {
        event.preventDefault()
        setIsShow(!isShow)
        console.log(isShow)
    }
    return (
        <div>
            <Videoplayer isShow={isShow} video_id={1} isLike={false} showPlayer={showPlayer}/>
            <div className="rounded-md border border-indigo-600 hover:bg-slate-100 w-64 h-64 p-1">
                <img className="rounded-t-md" src={props.thumbnail_url} alt=""  onClick={showPlayer} width="100%"  height="50%"/>
                <div>
                    <div className="flex flex-row">
                        <img src={props.profile_url} alt="" onClick={moveToMyPage}
                        className="rounded-full w-2/12 h-1/6"
                        />
                        <div className="flex flex-col">
                            <a className="text-sm truncate hover:underline hover:decoration-solid" onClick={showPlayer}>{props.title}</a>
                            <a className="text-xs truncate hover:underline hover:decoration-solid" onClick={moveToMyPage}>{props.author}</a>
                        </div>
                    </div>
                    <div>
                        {props.isLike ? "♥" : "♡"} {props.like_cnt} | comments {props.comments_cnt}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Videoitem