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
            thumbnail : `https://source.unsplash.com/random?sig=${i}`,
            member_id : i,
            nick_name : `닉네임 넘버-${i} `,
            profile_img : "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
            title : `제목 넘버-${i}`,
            like_cnt : 2400,
            comment_cnt : 20,
            year:'2023',
            month:i,
            date:i,

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
    // 검색
    const [searchTerm, setSearchTerm] = useState(""); // 검색어를 저장하는 상태
  

    const filteredData = data.filter(item => 
        item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="py-8 sm:py-8 ">
            <div className="bg-white mx-auto max-w-7xl px-2 lg:px-8">
                <h1 className="my-8 py-12 text-center font-bold text-3xl text-dark ">💌투표해줘</h1>           
                <div className="flex justify-end my-4 rounded"> {/* flex를 사용하여 우측으로 정렬 */}
                    <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search by title..." 
                            value={searchTerm} 
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="py-2 px-4 w-64 border rounded-md shadow-sm focus:ring focus:ring-opacity-50" 
                        />
                        <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                            🔍
                        </span>
                    </div>
                </div>
    
                <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {filteredData.map((item, idx) => {
                        return (
                            <Videoitem
                                key={idx}
                                props={item}
                                changeMode={() => {
                                    injectPostId(item.post_id);
                                    changeShow();
                                }}
                            />
                        );
                    })}
                    <div className="text-center" ref={target}>🚝찾는중🚝</div>
                </div>
            </div>
        </div>
    );
    }
    

export default Videolist