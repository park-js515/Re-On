import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";

const Comment = ({comment, deleteComment, changeShow, hierarchy}) => {

    const navigate = useNavigate()
    const [content, setContent] = useState(comment.content)
    const [updateMode, setUpdateMode] = useState(false)

    const moveToMyPage = (event) => {
        event.preventDefault();
        changeShow();
        navigate('/mypage')
    }

    const changeUpdateMode = () => {
        setUpdateMode((updateMode) => {return !updateMode})
    }

    const updateComment = () => {
        // axios 요청 (댓글 수정했다고)
        // Commentlist에도 알림
    }

    const handleChange = (event) =>{
        setContent(event.target.value)
    }

    return (
        
        <div className="bg-white shadow-sm p-3 mb-3 rounded-md">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <img className="rounded-full w-12 h-12 hover:cursor-pointer object-cover" src={comment.profileImg} alt="User Avatar" onClick={moveToMyPage} />
                    <div className="ml-4">
                        <p className="text-sm font-semibold mb-1 hover:cursor-pointer" onClick={moveToMyPage}>{comment.nickName}</p>
                        <textarea cols="30" rows="1" className={`${updateMode ? " border-white border" : ""} text-sm rounded resize-none w-full bg-white focus:outline-none`} disabled={!updateMode} value={content} onChange={handleChange}></textarea>
                    </div>
                </div>
                {false &&
                    <div className="flex flex-col space-y-1">
                        {/* 댓글 수정 */}
                        <button className="w-8 h-8 flex justify-center items-center bg-blue-500 text-info rounded hover:bg-[#c3c5c5] focus:outline-none" onClick={changeUpdateMode}>
                            <span>수정</span>
                        </button>
                        {/* 댓글 삭제 */}
                        <button className="w-8 h-8 flex justify-center items-center bg-red-500 text-danger rounded hover:bg-[#c3c5c5] focus:outline-none" onClick={() => { deleteComment(comment.comment_id) }}>
                            <span>삭제</span>
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Comment