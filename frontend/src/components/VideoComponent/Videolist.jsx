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
            thumbnail : "https://i.ytimg.com/vi/PJSH-r7uPfo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCP2xrC0yhdf70ORJ37lHEpZAPWCA",
            member_id : i,
            nick_name : `랄로상-${i} 기이이이이인 크리에이터어어어 이름`,
            profile_img : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
            title : `어쩌라고-${i}`,
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
        <div className="my-10">
            <h1 className="my-4 text-center font-bold text-3xl text-info">투표해줘</h1>
            <div className="grid gap-y-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-rows-auto">
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
            </div>
            <div className="text-center" ref={target}>더 보기...</div>
        </div>
)}

export default Videolist