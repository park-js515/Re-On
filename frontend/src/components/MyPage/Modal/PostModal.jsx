import React from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";
import { useState, useEffect } from "react";
import { searchPublicPostDetail, likePost, updatePost,deletePost } from 'apiList/post';

const PostModal = ({ detailPost, changeShow, getPosts }) => {
    
    const navigate = useNavigate();
    const [likeCnt, setIsLikeCnt] = useState(detailPost.likeCnt);
    const [IsLike, setIsLike] = useState(detailPost.isLike);
    const [updateMode, setUpdateMode] = useState(false)
    const [title, setTitle] = useState(detailPost.title)
    const [content, setContent] = useState(detailPost.content)
    
    //마이페이지 이동 
    const moveToMyPage = (event) => {
        navigate('/mypage')
    }
    
    //게시글 좋아요
    const likeVideo = (event) => {
        event.preventDefault()
        likePost((detailPost.id), () => {
            if (IsLike) {
                setIsLikeCnt(likeCnt-1)
            } else {
                setIsLikeCnt(likeCnt+1)
            }
            setIsLike(!IsLike)
            
        }, (error) => {
            console.log(error);
            
        })
    }
    //수정 모드 변경
    const changeUpdateMode = () => {
        setUpdateMode((updateMode) => { return !updateMode });
    }
    //post 내용 수정
    const uploadUpdatePost = () => {
        if (content.trim().length == 0) {
            alert("댓글 내용을 입력해주세요");
        } else if (title.trim().length == 0) {
            alert("제목을 입력해주세요");
        } else {
            updatePost(detailPost.id, { content: content, title: title }, () => {
                alert("수정이 완료되었습니다.")
            }, (error) => {
                console.log(error);
            })
        }
        changeUpdateMode();
    }
    //post 삭제
    const removePost = () => {

        if (window.confirm("게시글을 삭제하시겠습니까?")) {
            deletePost(detailPost.id, () => {
                alert("게시글이 삭제되었습니다.");
                getPosts();
                changeShow();
            }, (error) => {
                console.log(error);
            })
        }
    }

    //수정 취소
    const changeCancle = () => {
        setContent(detailPost.content);
        setTitle(detailPost.title);
        changeUpdateMode();
    }
    //제목 값 변경
    const titleHandleChange = (event) =>{
        setTitle(event.target.value)
    }
    //내용 변경
    const contentHandleChange = (event) =>{
        setContent(event.target.value)
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
                        
                    <textarea cols="30" rows="1" className={`${updateMode ? " border-white border" : ""} rounded resize-none w-full bg-white focus:outline-none block font-bold text-2xl mb-2`} disabled={!updateMode} value={title} onChange={titleHandleChange}></textarea>
                        {/* <span className="block font-bold text-2xl mb-2">{detailPost.title}</span> */}
                        

                    <div className="flex items-center">
                        <img className="rounded-full w-16 h-16 mr-4 hover:shadow-lg transition-shadow cursor-pointer" src={detailPost.profileImg} alt="" onClick={() => {changeShow(); moveToMyPage();}} />
                        <p className="flex-grow text-lg truncate cursor-pointer" onClick={()=>{changeShow(); moveToMyPage();}}>{detailPost.nickName}</p>
                        <button className={`ml-4 px-4 py-2 rounded ${IsLike ? "bg-[#ecebeb] hover:bg-[#aaa6a6] text-[#000]" : "bg-[#8d8d8d] text-black hover:bg-[#8d8d8d]"} transition-all`} onClick={likeVideo}>
                            좋아요 {convertToK(likeCnt)}
                            </button>
                            {!updateMode &&
                                <div>
                                    <button className={`ml-4 px-4 py-2 rounded bg-[#FAFAD2] hover:bg-[#FFFF00] text-[#000] transition-all`} onClick={changeUpdateMode}>수정</button>
                                    <button className={`ml-4 px-4 py-2 rounded bg-[#DC143C] hover:bg-[#FF0000] text-[#000] transition-all`} onClick={removePost}>삭제</button>
                                </div>}
                                {updateMode &&
                                <div>
                                    <button className={`ml-4 px-4 py-2 rounded bg-[#FAFAD2] hover:bg-[#FFFF00] text-[#000] transition-all`} onClick={uploadUpdatePost}>수정 완료</button>
                                    <button className={`ml-4 px-4 py-2 rounded bg-[#DC143C] hover:bg-[#FF0000] text-[#000] transition-all`} onClick={changeCancle}>수정 취소</button>
                                </div>}
                            
                    </div>
                </div>
                    {/* <div className="h-1/5 overflow-y-scroll mt-4 p-2 border-t border-gray-200 text-lg scrollbar-hide">{detailPost.content}</div> */}
                    <textarea cols="30" rows="1" className={`${updateMode ? " border-white border" : ""} h-1/5 overflow-y-scroll mt-4 p-2 border-t border-gray-200 text-lg scrollbar-hide`} disabled={!updateMode} value={content} onChange={contentHandleChange}></textarea>
                    
            </div>
            
            {/* 오른쪽 */}
            <div className="w-4/12 pl-4 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
                    <Commentlist post_id={ detailPost.id} commentList = {detailPost.postCommentResponses}
 changeShow={changeShow} hierarchy={0} />
            </div>
        </div>
       
    </div>
    )
}

export default PostModal

