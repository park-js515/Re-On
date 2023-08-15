import React from "react";
import Comment from "./Comment";
import { useState, useEffect } from "react";
import { createPostComment, searchPostDetailComment, deletePostComment, updatePostComment } from 'apiList/post';

const Commentlist = ({post_id, commentList, changeShow, hierarchy}) => {
    // 댓글은 게시글 식별자로 조회
    const [comments, setComments] = useState(commentList)
    const [userInput, setUserInput] = useState("");
    const [page, setPage] = useState(1)
    const [more, setMore] = useState(false) // 댓글 더보기 가능 여부

    useEffect(() => {
        if (comments.length == 10) {
            setMore(true)
        }
    }, []);

    if (hierarchy > 1) {
        return
    }

    const onChange = (event) => {
        setUserInput(event.target.value)
    }
    
    // const checkModal = () => {
    //     if (comments.length >= 10) {
    //         setMore(true)
    //     }
    // }

    // 댓글 더보기
    const getComment = async() => {
        await searchPostDetailComment(post_id, page + 1, (response) => {
            setPage((page) => { return page + 1 });
            setComments([...comments, ...response.data.response]);
            if (response.data.response.length < 10) {
                setMore(false)
            }
        }, (error) => {
            console.log(error);
        });
    }

    const addComment = () => {
        if (userInput.length < 1) {
            alert("댓글 작성 후 눌러주세요")
        }
        else {
            // axios로 API 서버에 댓글 생성 보내기
            createPostComment(post_id, { content: userInput }, () => {
                //성공시에 다시 댓글 불러오기
                searchPostDetailComment(post_id, 1, (response) => {
                    console.log(response.data.response);
                    setComments(response.data.response);
                    if (response.data.response == 10) {
                        setMore(true)
                    }
                }, (error) => {
                    console.log(error);
                })
            }, (error) => {
                console.log(error);
            } )
            setUserInput("")
        }
    }

    const deleteComment = (id) => {
        const newComments = comments.filter((comment)=> comment.comment_id !== id)
        setComments([...newComments])
        deletePostComment(id, () => {
            searchPostDetailComment(post_id, 1, (response) => {
                console.log(response.data.response);
                setComments(response.data.response);
                if (response.data.response == 10) {
                    setMore(true)
                }
            }, (error) => {
                console.log(error);
            },(error) => {
                console.log(error);
            })
        })
    }

    const updateComment = (id, content) => {
        updatePostComment(id, { content: content }, () => {
        }, (error) => {
            console.log(error);
        })
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
                        <Comment comment={comment} key={comment.id} deleteComment={deleteComment} updateComment={updateComment} changeShow={changeShow} hierarchy={hierarchy}/>
                    )
                })}
                { more ? <MoreButton/> : null }
            </div>

        </div>
    )
}

export default Commentlist

