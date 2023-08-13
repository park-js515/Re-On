import React from "react";
import { useNavigate } from 'react-router-dom';
import Commentlist from "./Commentlist";
import { useState, useEffect } from "react";
import { searchPublicPostDetail, likePost, updatePost, pullDownPublicPost } from "apiList/post";

const Videoplayer = ({post_id, changeShow}) => {
    let ignore = false;
    
    const [data, setData] = useState([])
    const [edit, setEdit] = useState(false)
    const [content, setContent] = useState("")
    const [title, setTitle] = useState("")

    useEffect(()=>{
        if (!ignore){
            searchPublicPostDetail(
                post_id,
                (response)=>{
                    const newdata = response.data.response
                    setData(newdata)
                    setTitle(newdata.title)
                    setContent(newdata.content)
                },
                (error)=>{console.log(error)}
            )
        }
        return ()=>{
            ignore = true;
        }
    },[]);

    const navigate = useNavigate();

    const moveToMyPage = () => {
        navigate('/mypage')
    }

    const likeVideo = (event) => {
        event.preventDefault()
        likePost(
            post_id,
            (response)=>{
                let temp = {...data}
                if (temp.isLike){
                    temp.likeCnt--;
                }
                else {
                    temp.likeCnt++;
                }
                temp.isLike = !temp.isLike
                setData({...temp})
            },
            (error)=>{console.log(error)}
        )
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
    const deletePost = () => {
        pullDownPublicPost(
            post_id,
            (response)=>{
                console.log(response.data)
                changeShow();
            },
            (error)=>{
                console.log(error)
            }
        )
    }

    const editPost = () => {
        if (edit){
            if (title.trim() === "" || content.trim() === ""){
                alert("입력 후에 수정해주세요.")
                setTitle(data.title)
                setContent(data.content)
            }
            else {
                updatePost(
                    post_id,
                    { title : title, content : content},
                    (response)=>{
                        console.log(response.data)
                    },
                    (error)=>{
                        console.log(error)
                    }
                )
            }
        }
        setEdit((edit)=>{return !edit})
    }
    const changeContent = (event) => {
        setContent(event.target.value)
    }
    const changeTitle = (event) => {
        setTitle(event.target.value)
    }
    return (
        // 모달 외부클릭시 꺼짐
        <div className="fixed top-6 z-40 w-full h-full flex justify-center items-center bg-black bg-opacity-50" onClick={changeShow}> 
             {/*모달 내부는 이상없게  */}
            <div className="flex w-10/12 h-[80vh] max-h-[80vh]  bg-white p-4 rounded-lg shadow-lg overflow-hidden" onClick={e => e.stopPropagation()}>

            {/* Left Section */}
            <div className="w-8/12 pr-4 border-r border-gray-200 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
                
                {/* 비디오 */}
                <video className="w-full h-full rounded-md shadow-sm" controls src={"https://storage.googleapis.com/reon-bucket/" + data.actionPath}></video>
                
                {/* 작성자 정보 */}
                <div className="my-4 p-3 bg-gray-100 rounded-lg">
                    <textarea 
                        rows="2"
                        value={title}
                        className={`resize-none text-2xl block font-bold mb-2 w-11/12 rounded ${edit ? "outline" : null}`}
                        onChange={changeTitle}
                        disabled={!edit}
                    >
                    </textarea>
                    <div className="flex items-center">
                        <img className="rounded-full w-16 h-16 mr-4 hover:shadow-lg transition-shadow cursor-pointer" src={data.profileImg} alt="" onClick={() => {changeShow(); moveToMyPage();}} />
                        <p className="flex-grow text-lg truncate cursor-pointer" onClick={()=>{changeShow(); moveToMyPage();}}>{data.nickName}</p>
                        <button className={`ml-4 px-4 py-2 rounded ${data.isLike ? "bg-[#ecebeb] hover:bg-[#aaa6a6] text-[#000]" : "bg-[#8d8d8d] text-black hover:bg-inss"} transition-all`} onClick={likeVideo}>
                            {data.isLike ? "👍️" : "🤜"} {convertToK(data.likeCnt)}
                        </button>
                        {/* 내 게시글이면 수정 삭제 버튼 */}
                        {data.isMyPost ?
                            <div>
                                <button
                                    className="bg-warning rounded px-3 py-2 ml-4 text-md"
                                    onClick={editPost}
                                >✍️</button>

                                <button
                                    className="bg-danger rounded px-3 py-2 ml-4 text-md"
                                    onClick={deletePost}
                                >🗑️</button>
                            </div>
                        : null}
                    </div>
                </div>
                <textarea 
                    value={content}
                    className={`ml-3 p-3 resize-none rounded w-11/12 ${edit ? "outline" : null}`}
                    disabled={!edit}
                    onChange={changeContent}
                >
                </textarea>
            </div>
            
            {/* 오른쪽 */}
            <div className="w-4/12 pl-4 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
                {data.postCommentResponses ? 
                    <Commentlist post_id={data.id} changeShow={changeShow} initialData={[...data.postCommentResponses]} />
                    : null
                }
            </div>
        </div>
       
    </div>
    )
}

export default Videoplayer

