import React from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";
import { useState, useEffect } from "react";
import { searchPublicPostDetail } from 'apiList/post';

const PostModal = ({detailPost, changeShow}) => {
    const navigate = useNavigate();

    // const data = dataList.find(data => data.post_id === post_id) || dataList[0];
    
    const [IsLike, setIsLike] = useState();
    
    //마이페이지 이동 
    const moveToMyPage = (event) => {
        navigate('/mypage')
    }

    const likeVideo = (event) => {
        event.preventDefault()
        setIsLike(!IsLike)
        // axios 요청까지 해야됨
    }

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
    return (
        <div 
                className="fixed z-40 top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
                onClick={changeShow} 
            >
            <div 
                className="flex w-10/12 h-[80vh] max-h-[80vh] bg-white p-4 rounded-lg shadow-lg overflow-hidden"
                onClick={e => e.stopPropagation()} 
            >
                
            {/* Left Section */}
            <div className="w-8/12 pr-4 border-r border-gray-200 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
                
                {/* 비디오 */}
                <iframe className="w-full h-full rounded-md shadow-sm" title="Youtube"  src={"https://storage.googleapis.com/reon-bucket/" + detailPost.actionPath}></iframe>
                
                {/* 작성자 정보 */}
                <div className="my-4 p-3 bg-gray-100 rounded-lg">
                    <span className="block font-bold text-2xl mb-2">{detailPost.title}</span>
                    <div className="flex items-center">
                        <img className="rounded-full w-16 h-16 mr-4 hover:shadow-lg transition-shadow cursor-pointer" src={detailPost.profileImg} alt="" onClick={() => {changeShow(); moveToMyPage();}} />
                        <p className="flex-grow text-lg truncate cursor-pointer" onClick={()=>{changeShow(); moveToMyPage();}}>{detailPost.nickName}</p>
                        <button className={`ml-4 px-4 py-2 rounded ${detailPost.IsLike ? "bg-[#ecebeb] hover:bg-[#aaa6a6] text-[#000]" : "bg-[#8d8d8d] text-black hover:bg-[#8d8d8d]"} transition-all`} onClick={likeVideo}>
                            영상 좋아요 {convertToK(detailPost.likeCnt)}
                        </button>
                    </div>
                </div>
                <div className="h-1/5 overflow-y-scroll mt-4 p-2 border-t border-gray-200 text-lg scrollbar-hide">{detailPost.content}</div>
            </div>
            
            {/* 오른쪽 */}
            <div className="w-4/12 pl-4 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
                <Commentlist post_id={detailPost.post_id} changeShow={changeShow} hierarchy={0} />
            </div>
        </div>
       
    </div>
    )
}

export default PostModal

