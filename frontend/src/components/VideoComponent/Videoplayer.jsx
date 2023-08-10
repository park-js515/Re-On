import React from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";
import { useState } from "react";

const Videoplayer = ({post_id, changeShow}) => {
    const navigate = useNavigate();

    // 더미 
    let dataList = [];
    for (let i = 1; i <= 10; i++) {
        dataList.push({
            post_id: i,
            thumbnail: `https://source.unsplash.com/random?sig=${i}`,
            member_id: i,
            nick_name: `닉네임 넘버-${i}`,
            profile_img: `https://source.unsplash.com/random?sig=123${i}`,
            title: `제목 넘버-${i}`,
            like_cnt: 12 + i,
            comment_cnt: 20 + i,
            isLike: true,
            video_list: "https://www.youtube.com/embed/OpJOUU5rePY",
            content: 
                `제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 
                제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 제곧내 
                
                `
            });
    }

    const data = dataList.find(data => data.post_id === post_id) || dataList[0];
    
    const [IsLike, setIsLike] = useState(data.isLike);

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
        // 모달 외부클릭시 꺼짐
        <div className="fixed top-6 z-40 w-full h-full flex justify-center items-center bg-black bg-opacity-50" onClick={changeShow}> 
             {/*모달 내부는 이상없게  */}
            <div className="flex w-10/12 h-[80vh] max-h-[80vh]  bg-white p-4 rounded-lg shadow-lg overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Left Section */}
            <div className="w-8/12 pr-4 border-r border-gray-200 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
                
                {/* 비디오 */}
                <iframe className="w-full h-full rounded-md shadow-sm" title="Youtube"  src={data.video_list}></iframe>
                
                {/* 작성자 정보 */}
                <div className="my-4 p-3 bg-gray-100 rounded-lg">
                    <span className="block font-bold text-2xl mb-2">{data.title}</span>
                    <div className="flex items-center">
                        <img className="rounded-full w-16 h-16 mr-4 hover:shadow-lg transition-shadow cursor-pointer" src={data.profile_img} alt="" onClick={() => {changeShow(); moveToMyPage();}} />
                        <p className="flex-grow text-lg truncate cursor-pointer" onClick={()=>{changeShow(); moveToMyPage();}}>{data.nick_name}</p>
                        <button className={`ml-4 px-4 py-2 rounded ${IsLike ? "bg-[#ecebeb] hover:bg-[#aaa6a6] text-[#000]" : "bg-[#8d8d8d] text-black hover:bg-inss"} transition-all`} onClick={likeVideo}>
                            영상 좋아요 {convertToK(data.like_cnt)}
                        </button>
                    </div>
                </div>
                
                <div className="h-1/5 overflow-y-scroll mt-4 p-2 border-t border-gray-200 text-lg scrollbar-hide">{data.content}</div>
            </div>
            
            {/* 오른쪽 */}
            <div className="w-4/12 pl-4 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
                <Commentlist post_id={data.post_id} changeShow={changeShow} hierarchy={0} />
               
            </div>
        </div>
       
    </div>
    )
}

export default Videoplayer

