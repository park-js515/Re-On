import React from "react";
import Comment from "./Comment";
import { useState } from "react";
import './videocomponent.css'
const Commentlist = ({video_id, changeShow}) => {

    // 댓글은 영상 식별자로 조회
    const testdata = [
        {
            comment_id : 1,
            content : "랄로 기다린 랄붕이면 개추",
            author : "마루쉐",
            author_id : 1,
            profile_url : "https://yt3.googleusercontent.com/ytc/AOPolaRGljY8JqJqiskPWVM_bOh2Lon8sbDWwD__idDP=s176-c-k-c0x00ffffff-no-rj-mo",
            recomments_cnt : 1
        },
        {
            comment_id : 2,
            content : "이따 봐야지 ㅋㅋ",
            author : "마루쉐",
            author_id : 1,
            profile_url : "https://yt3.googleusercontent.com/ytc/AOPolaRGljY8JqJqiskPWVM_bOh2Lon8sbDWwD__idDP=s176-c-k-c0x00ffffff-no-rj-mo",
            recomments_cnt : 0
        },
        {
            comment_id : 3,
            content : "산책 시켜줘",
            author : "마루쉐",
            author_id : 1,
            profile_url : "https://yt3.googleusercontent.com/ytc/AOPolaRGljY8JqJqiskPWVM_bOh2Lon8sbDWwD__idDP=s176-c-k-c0x00ffffff-no-rj-mo",
            recomments_cnt : 0
        },
    ]
    const [comments, setComments] = useState(testdata)
    const [userInput, setUserInput] = useState("");

    const onChange = (event) => {
        event.preventDefault();
        setUserInput(event.target.value)
        console.log(userInput)
    }

    const renewComments = (event) => {
        event.preventDefault();
        // axios.post(data=userInput)
        const temp = {
            comment_id : Math.round(Math.random()*100),
            content : userInput,
            author : "마루쉐",
            author_id : 1,
            profile_url : "https://yt3.googleusercontent.com/ytc/AOPolaRGljY8JqJqiskPWVM_bOh2Lon8sbDWwD__idDP=s176-c-k-c0x00ffffff-no-rj-mo",
            recomments_cnt : Math.round(Math.random()*10),
        }
        setComments((comments)=>{return [...comments, temp]})
        setUserInput("")
    }

    const deleteComment = (id) => {
        const newComments = comments.filter((comment)=> comment.comment_id !== id)
        console.log(newComments)
        setComments([...newComments])
    }

    return (
        <div className="mt-1 h-full rounded ring-2 ring-info hover:scroll-auto overflow-y-scroll non-scroll-bar">
            {/* 댓글 입력 창 */}
            <div className="flex"> 
                <input className="mx-1 mt-2 mb-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-5/6 rounded-md sm:text-sm focus:ring-1"
                type="text" placeholder="댓글 추가..."
                value={userInput} onInput={onChange}
                />
                <button type="button" className="" onClick={renewComments}>추가</button>
            </div>
            {/* 댓글 리스트 */}
            <div className="m-1">
                {comments.map((comment)=>{
                    return (
                        <Comment comment={comment} key={comment.comment_id} deleteComment={deleteComment} changeShow={changeShow}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Commentlist