import React from "react";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import './videocomponent.css'

const Commentlist = ({post_id, changeShow, hierarchy}) => {
    // 댓글은 게시글 식별자로 조회
    const [comments, setComments] = useState([])
    const [userInput, setUserInput] = useState("");
    const [page, setPage] = useState(0)
    const [more, setMore] = useState(true) // 댓글 더보기 가능 여부

    useEffect(()=>{
        getComment()
    }, []);

    if (hierarchy > 1) {
        return
    }

    const onChange = (event) => {
        setUserInput(event.target.value)
    }

    const getComment = () => {
        if (more) {
            // axios로 10개씩 받아오기 post_id, page
            let data = []
            for (let i = 0; i < 2; i++) {
                data.push(
                    {
                        comment_id : i,
                        content : `댓글이다-${i}`,
                        author : "희창",
                        author_id : 1,
                        profile_url : `https://source.unsplash.com/random?sig=888${i}`,
                    }
                )
            }
            setComments((comments) => {return [...data, ...comments]})
            setPage((page)=>{return page+1})
            if (data.length < 10){
                setMore(false)
            }
        }
    }

    const addComment = () => {
        if (userInput.length < 1) {
            alert("댓글 작성 후 눌러주세요")
            return
        }
        else {
            // axios로 API 서버에 댓글 생성 보내기
            // 필요 내용 받아서 다시 렌더링 (실제로는 리턴으로 받을 가장 최신 댓글 10개로 다시 랜더링)
            const temp = {
                comment_id : Math.round(Math.random()*100),
                content : userInput,
                author : "마루쉐",
                author_id : 1,
                profile_url : "https://source.unsplash.com/random?sig=888",
            }
            setComments((comments)=>{return [temp, ...comments]})
            setUserInput("")
        }
    }

    const deleteComment = (id) => {
        const newComments = comments.filter((comment)=> comment.comment_id !== id)
        setComments([...newComments])
    }

    const MoreButton = () => {
        return (
            <div onClick={getComment} className="rounded text-center cursor-pointer ring-2 p-2 hover:bg-black transition">
                더 보기
            </div>
        )
    }
    return (
        
        <div className="h-full rounded hover:scroll-auto overflow-y-scroll scrollbar-hide">

            {/* 댓글 입력 창 */}
            <div className="flex relative"> 
            <input 
                className="mx-1 mt-2 mb-1 px-3 py-2 bg-white shadow-md focus:outline-none block w-full rounded-md sm:text-sm focus:ring-2"
                type="text" 
                placeholder="댓글 추가..."
                value={userInput} 
                onInput={onChange}
            />
            <button 
                type="button" 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 "
                onClick={addComment}
            >
                추가
            </button>
        </div>

            {/* 댓글 리스트 */}
            <div className="m-1">
                {comments.map((comment)=>{
                    return (
                        <Comment comment={comment} key={comment.comment_id} deleteComment={deleteComment} changeShow={changeShow} hierarchy={hierarchy}/>
                    )
                })}
                { more ? <MoreButton/> : null }
            </div>
            
        </div>
    )
}

export default Commentlist

