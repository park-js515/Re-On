import React from "react";
import { useNavigate } from 'react-router-dom';

const Comment = ({comment}) => {
    const navigate = useNavigate()

    const moveToMyPage = (event) => {
        event.preventDefault();
        navigate('/mypage')
    }

    const recomments = [
        {
            recomments_id : 1,
            content : "개추",
            author : "나 마루쉐 아니다",
            author_id : 2,
            profile_url : "https://yt3.googleusercontent.com/ytc/AOPolaRGljY8JqJqiskPWVM_bOh2Lon8sbDWwD__idDP=s176-c-k-c0x00ffffff-no-rj-mo"
        }
    ]

    return (
        <div className="flex justify-between items-center border rounded">
            <div className="my-2 mx-2 flex">
                <img className="rounded-full w-16 h-16 hover:cursor-pointer" src={comment.profile_url} alt="" onClick={moveToMyPage} />
                <div className="ml-4">
                    <a className="text-sm mb-1 hover:cursor-pointer" onClick={moveToMyPage}>{comment.author}</a>
                    <p className="text-base">{comment.content}</p>
                </div>
            </div>
            {comment.recomments_cnt > 0 ? <p>댓글</p> : null}
        </div>
    )
}

export default Comment