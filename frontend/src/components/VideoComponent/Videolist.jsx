import React from "react";
import Videoitem from "./Videoitem";
import { useState, useRef, useEffect } from "react";

const Videolist = ({injectPostId, changeShow}) => {
  
    const addData = () => {
        // API 요청 후 받은 걸로 추가 (비디오 뭉탱이)
        let temp = []
        for (let i = 1; i <= 20; i++){
            temp.push({
            post_id : i,
            thumbnail : 'https://source.unsplash.com/random?sig=1',
            member_id : i,
            nick_name : `닉네임 넘버-${i} `,
            profile_img : "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            title : `제목 넘버-${i}`,
            like_cnt : 2400,
            comment_cnt : 20,
            })
        }
        return temp
    }

    const [data, setData] = useState([])
    const [page, setPage] = useState(0)
    const target = useRef()
    const options = {
        threshold: 1.0
    };
    const renewData = () => {
        setData((data) => {return [...data, ...addData()]})
        setPage((page) => {return page + 1})
    }
    const observer = new IntersectionObserver(renewData, options)

    useEffect(()=>{
        observer.observe(target.current)
    }, []);

    return(
    

        
        <div className="bg-white py-12 sm:py-">
            <h1 className="my-4 text-center font-bold text-3xl text-dark">💌투표해줘</h1>
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                {data.map((item,idx)=>{
                    return (
                        <Videoitem
                            key={idx}
                            props={item}
                            changeMode={()=>{
                                injectPostId(item.post_id)
                                changeShow()
                            }}
                        />
                    )   
                })}
          
                <div className="text-center" ref={target}>더 보기...</div>
                </div>
            </div>
        </div>

)}

export default Videolist