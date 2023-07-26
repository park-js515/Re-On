import React from "react";
import VideoItem from "./VideoItem";
import SGrid4 from "./style";

const VideoList = (props) => {
    const LIST_TYPE = props.type
    let apiURL = null;

    if (LIST_TYPE === "public"){
        apiURL = "https://"
    }
    else if (LIST_TYPE === "private"){
        apiURL = "https://"
    }
    else if (LIST_TYPE === "like"){
        apiURL = "https://"
    }
    else if (LIST_TYPE === "feed"){
        apiURL = "https://"
    }
    else if (LIST_TYPE === "normal"){
        apiURL = "https://"
    }

    function getVideoInfos() {
        // axios({
        //     method: "GET",
        //     url: apiURL
        // })
        // .then((response)=>{
        //     return response.data
        // })
        
        let ret = []
        const TEMPINFO = {
                key:1,
                thumbnail_url:"https://media.hellobot.co/fixedmenu/%E1%84%89%E1%85%B5%E1%84%85%E1%85%A9_%E1%84%8B%E1%85%A1%E1%84%86%E1%85%AE%20%E1%84%8B%E1%85%B5%E1%84%85%E1%85%B3%E1%86%B7%20%E1%84%8C%E1%85%B5%E1%86%BA%E1%84%80%E1%85%B5.png",
                profile_image_url:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOH2aZnIHWjMQj2lQUOWIL2f4Hljgab0ecZQ&usqp=CAU",
                author:"희창시치",
                title:"희창시치의 리경영 연기",
                like_cnt:3,
                comments_cnt:5,
        }
        for (let i = 1; i<=20; i++){
            TEMPINFO.key = i
            ret.push({...TEMPINFO})
        }
        return ret;
    }

    const VIDEOINFOS = getVideoInfos().map((info)=>{
        return <VideoItem 
            key={info.key}
            thumbnail_url={info.thumbnail_url}
            profile_image_url={info.profile_image_url}
            author={info.author}
            title={info.title}
            like_cnt={info.like_cnt}
            comments_cnt={info.comments_cnt}
            ></VideoItem>
    })

    return (
        <SGrid4>
            {VIDEOINFOS}
        </SGrid4>
    )
}

export default VideoList