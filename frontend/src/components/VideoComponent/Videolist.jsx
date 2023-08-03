import React from "react";
import Videoitem from "./Videoitem";
import { useState, useRef, useEffect } from "react";

const Videolist = ({injectVideoID, changeShow}) => {

    const addData = (input) => {
        // 테스트 데이터, API 완성 후 axios 요청
        for (let i = 1; i <= 20; i++){
            input.push({
            video_id : i,
            thumbnail_url : "https://i.ytimg.com/vi/PJSH-r7uPfo/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLCP2xrC0yhdf70ORJ37lHEpZAPWCA",
            author_id : i,
            author : `랄로상-${i} 기이이이이인 크리에이터어어어 이름`,
            profile_url : "https://yt3.ggpht.com/ytc/AOPolaQEivCeo8OdmA0NhR3XhlRVybG6CTVeeA4YEL75Ug=s68-c-k-c0x00ffffff-no-rj",
            title : `어쩌라고-${i}`,
            like_cnt : 2400,
            comments_cnt : 20,
            isLike : (i % 2 === 0 ? true : false)
            })
        }
        return input
    }

    const [data, setData] = useState(addData([]))
    const [page, setPage] = useState(1)
    const target = useRef()
    const options = {
        threshold: 1.0
    };
    const renewData = () => {
        setData((data) => {return [...addData(data)]})
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
                                injectVideoID(item.video_id)
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