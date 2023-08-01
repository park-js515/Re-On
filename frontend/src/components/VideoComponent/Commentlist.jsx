import React from "react";
import Comment from "./Comment";
import { useState } from "react";

const Commentlist = ({video_id}) => {

    // 댓글은 영상 식별자로 조회
    const comments = [
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
    const [userInput, setUserInput] = useState("");
    const onChange = (event) => {
        event.preventDefault();
        setUserInput(event.target.value)
        console.log(userInput)
    }
    const addComment = (event) => {
        event.preventDefault();
        // axios.post(data=userInput)
        console.log(userInput)
        setUserInput("")
    }
    return (
        <div className="border mt-1 w-2/3">
            <label htmlFor="">댓글</label>
            <div className="flex mb-2">
                <input className="mx-1 mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-green-500 focus:ring-green-500 block w-5/6 rounded-md sm:text-sm focus:ring-1"
                type="text" placeholder="댓글 추가..."
                value={userInput} onInput={onChange}
                />
                <button type="button" className="mx-1 mt-1 px-3 py-2 ml-1 h-9 bg-green-400 rounded-md active:bg-green-500 w-1/6" onClick={addComment}>추가</button>
            </div>
            <div>
                {comments.map((item,idx)=>{
                    return (
                        <Comment comment={item} key={idx}/>
                    )
                })}
            </div>
        </div>
    )
}

export default Commentlist