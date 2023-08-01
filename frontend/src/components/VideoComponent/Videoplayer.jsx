import React from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";
import { useState } from "react";
const Videoplayer = ({video_id, isLike, isShow, showPlayer}) => {
    const navigate = useNavigate();
    const [getIsLike, setIsLike] = useState(isLike)
    // 실제 데이터는 video_id로 요청 후 활용
    const data = {
        video_url : "https://www.youtube.com/embed/PJSH-r7uPfo",
        author_id : 1,
        author : "Ralo",
        profile_url : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
        title : "니가 뭘 할수있는데",
        like_cnt : 2400,
        comments_cnt : 20,
    }

    const moveToMyPage = (event) => {
        event.preventDefault();
        navigate('/mypage')
    }
    const likeVideo = (event) => {
        event.preventDefault()
        setIsLike(!getIsLike)
    }
    if (isShow){
        return (
            <div className="absolute mx-2 flex flex-col justify-around">
                <div>
                    <button className="bolder bg-red-500" onClick={showPlayer}>X</button>
                </div>
                <iframe width="1024" height="576" src={data.video_url} allowFullScreen></iframe>
                <h1 className="font-bold text-2xl my-2 ml-2">{data.title}</h1>
                <div className="flex">
                    <div className="flex items-center ml-2">
                        <img className="rounded-full w-16 h-16 hover:cursor-pointer" src={data.profile_url} alt="" />
                        <a className="ml-4 text-lg truncate hover:cursor-pointer" onClick={moveToMyPage}>{data.author}</a>
                    </div>
                    <button className={getIsLike ? "w-1/6 rounded-md border ml-10 mr-1 bg-green-500 text-white" : "w-1/6 rounded-md border ml-10 mr-1 outline-green-500 text-green-500"} type="button" onClick={likeVideo}>Like : {data.like_cnt}</button>
                </div>
                <div className="ml-2">
                    <Commentlist video_id={video_id} />
                </div>
            </div>
        )
    }
    else {
        return null;
    }
}

export default Videoplayer