import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";

const Comment = ({comment, deleteComment, updateComment, changeShow, hierarchy}) => {
    console.log("comment")
    console.log(comment)
    const navigate = useNavigate()
    const [content, setContent] = useState(comment.content)
    const [updateMode, setUpdateMode] = useState(false)

    const moveToMyPage = (event) => {
        event.preventDefault();
        changeShow();
        navigate('/mypage/'+comment.email)
    }

    const changeUpdateMode = () => {
        setUpdateMode((updateMode) => { return !updateMode });
    }

    const changeCancle = () => {
        setContent(comment.content);
        changeUpdateMode();
    }

    const updateCommentContent = () => {
        if (content.trim().length == 0) {
            alert("댓글 내용을 입력해주세요");
        } else {
            updateComment(comment.id, content);
            changeUpdateMode();
        }
    }

    const handleChange = (event) =>{
        setContent(event.target.value)
    }

    return (
        
        <div className="bg-white shadow-sm p-3 mb-3 rounded-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img className="rounded-full w-12 h-12 hover:cursor-pointer object-cover" src={comment.profileImg ? "https://storage.googleapis.com/reon-bucket/"+comment.profileImg : "image/login/LoginDefaultImg.png"} alt="User Avatar" onClick={moveToMyPage} />
                    <div className="ml-4">
                        <p className="text-sm font-semibold mb-1 hover:cursor-pointer" onClick={moveToMyPage}>{comment.nickName}</p>
                        <textarea cols="30" rows="1" className={`${updateMode ? " border-white border" : ""} text-sm rounded resize-none w-full bg-white focus:outline-none`} disabled={!updateMode} value={content} onChange={handleChange}></textarea>
                    </div>
                </div>
                {comment.isMyComment &&
                    <div className="flex flex-col space-y-1">
                        {!updateMode && <div>
                            {/* 댓글 수정 */}
                            <button className="w-8 h-8 flex justify-center items-center bg-blue-500 text-info rounded hover:bg-[#c3c5c5] focus:outline-none" onClick={changeUpdateMode}>
                            <span>수정</span>
                        </button>
                        {/* 댓글 삭제 */}
                        <button className="w-8 h-8 flex justify-center items-center bg-red-500 text-danger rounded hover:bg-[#c3c5c5] focus:outline-none" onClick={() => { deleteComment(comment.id) }}>
                            <span>삭제</span>
                        </button></div>}
                        {updateMode && <div><button className="w-8 h-8 flex justify-center items-center bg-blue-500 text-info rounded hover:bg-[#c3c5c5] focus:outline-none" onClick={updateCommentContent}>
                            <span>수정</span>
                        </button><button className="w-8 h-8 flex justify-center items-center bg-blue-500 text-info rounded hover:bg-[#c3c5c5] focus:outline-none" onClick={changeCancle}>
                            <span>취소</span>
                        </button></div>}
                        
                    </div>
                }
            </div>
        </div>
    )
}

export default Comment