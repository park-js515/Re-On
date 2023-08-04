import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";

const Comment = ({comment, deleteComment, changeShow, hierarchy}) => {

    const navigate = useNavigate()
    const [content, setContent] = useState(comment.content)
    const [updateMode, setUpdateMode] = useState(false)
    const [more, setMore] = useState(false)

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
        <div>
            <div className="flex justify-between items-center border rounded mb-1">
                <div className="my-2 mx-2 flex">
                    <img className="rounded-full w-8 h-8 hover:cursor-pointer" src={comment.profile_url} alt="" onClick={moveToMyPage} />
                    <div className="ml-4">
                        <p className="text-sm mb-1 hover:cursor-pointer" onClick={moveToMyPage}>{comment.author}</p>
                        <textarea cols="25" className={updateMode ? "outline outline-info text-sm rounded resize-none h-auto" : "text-sm resize-none h-auto"} type="text" disabled={!updateMode} value={content} onChange={handleChange}/>
                    </div>
                </div>
                <div className="flex flex-col"> 
                    {/* 대댓글 보기 */}
                    { hierarchy < 1 ? 
                        <button className="bg-info w-4 h-4 m-1 rounded text-xs" onClick={()=>{setMore(!more)}}>+</button>
                    : null}

                    {/* 댓글 수정 */}
                    <button className="bg-warning w-4 h-4 m-1 rounded text-xs" onClick={changeUpdateMode}>U</button>
                    {/* 댓글 삭제 */}
                    <button className="bg-danger w-4 h-4 m-1 rounded text-xs" onClick={()=>{deleteComment(comment.comment_id)}}>D</button>
                </div>
            </div>
            { more &&  hierarchy === 0?
                <div className="ml-5">
                    <Commentlist post_id={comment.comment_id} changeShow={changeShow} hierarchy={hierarchy+1}/>
                </div>
            : null }
        </div>
    )
}

export default Comment