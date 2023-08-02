import React from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";
import { useState } from "react";

const Videoplayer = ({vi, changeShow}) => {
    const navigate = useNavigate();

    // 실제 데이터는 video_id로 요청 후 활용
    const data = {
        video_url : "https://www.youtube.com/embed/PJSH-r7uPfo",
        author_id : 1,
        author : "Ralo",
        profile_url : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
        title : "니가 뭘 할수있는데 ddddddddddddddddddddddddddddfsdfasdfadddddddddddddddddddddddd",
        like_cnt : 2400,
        comments_cnt : 20,
        isLike : true,
    }
    const [getIsLike, setIsLike] = useState(data.isLike)

    const moveToMyPage = (event) => {
        event.preventDefault();
        navigate('/mypage')
    }

    const likeVideo = (event) => {
        event.preventDefault()
        setIsLike(!getIsLike)
        // axios 요청까지 해야됨
    }

    return (
        <div className="fixed top-20 left-30 z-40 flex bg-white w-4/5 h-10/12 border rounded-lg p-2">

            {/* 왼쪽 분할 */}
            <div className="w-2/3">
                {/* 영상 */}
                <iframe width="800" height="450" src={data.video_url} allowFullScreen></iframe>

                {/* 영상 정보 창 */}
                <div className="my-2 border rounded-lg bg-lightGray p-3 truncate">
                    <span className="font-bold text-2xl">{data.title}</span>
                    <div className="flex">
                        <div className="flex items-center">
                            <img className="rounded-full w-16 h-16 hover:cursor-pointer" src={data.profile_url} alt="" />
                            <a className="text-lg truncate hover:cursor-pointer" onClick={moveToMyPage}>{data.author}</a>
                        </div>
                        <button className={getIsLike ? "w-1/6 rounded-md border ml-10 mr-1 bg-green-500 text-white" : "w-1/6 rounded-md border ml-10 mr-1 outline-green-500 text-green-500"} type="button" onClick={likeVideo}>Like : {data.like_cnt}</button>
                    </div>
                </div>
            </div>

            {/* 오른쪽 분할 */}
            <div className="w-1/3 ml-4">
                <Commentlist video_id={vi} />
            </div>

            {/* 나가기 구역 */}
            <button className="bg-danger h-min text-xl ml-4" onClick={changeShow}>
                X
            </button>

        </div>
    )
}

export default Videoplayer