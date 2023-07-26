import React from "react";
import {SInfo, SImg, SDiv, STitle, SName, SExtraInfo, SLink} from "./style"
import { useNavigate, useLocation } from "react-router-dom";

const Info = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handleClick = (event) => {
        event.preventDefault();
        // 나중에 작성자 아이디까지 같이
        // navigate("/mypage/{props.author_id}")
        navigate("/mypage")
    }
    return (
        <SInfo>
            <SDiv>
                <SLink href="#" onClick={handleClick}><SImg src={props.profile_image_url} alt="profile"></SImg></SLink>
                <div>
                    <SLink href="#"><STitle>{props.title}</STitle></SLink>
                    <br />
                    <SLink href="#" onClick={handleClick}><SName>{props.author}</SName></SLink>
                </div>
            </SDiv>
            
                <SExtraInfo>&#128147; {props.like_cnt} | &#128488; {props.comments_cnt}</SExtraInfo>
        </SInfo>
    )
}

export default Info