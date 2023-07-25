import React from "react";
import {SInfo, SImg} from "./style"

const Info = (props) => {
    return (
        <SInfo>
            <div>
                <SImg src={props.profile_image_url} alt="profile"></SImg>
                <p>{props.title}</p>
                <p>{props.author}</p>
            </div>
            <div>
                <span>좋아요 {props.like_cnt} 이미지가 들어올거얌</span>
            </div>
        </SInfo>
    )
}

export default Info