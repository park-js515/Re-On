import React from "react";
import { useNavigate } from "../../../node_modules/react-router-dom/dist/index";

const Videoitem = ({props}) => {
    const navigate = useNavigate();

    const moveToMyPage = (event) => {
        event.preventDefault();
        navigate('/mypage')
    }

    const showPlayer = (event) => {
        event.preventDefault()
        alert("아직 모달 준비 안됐음")
    }
    return (
    <div>
        <img src={props.thumbnail_url} alt=""  onClick={showPlayer} width="100%"  height="50%"/>
        <div>
            <div className="flex flex-row">
                <img src={props.profile_url} alt="" onClick={moveToMyPage} width="30"
                    height="30" className="rounded-full"/>
                <div>
                    <h6 className="text-sm truncate" onClick={showPlayer}>{props.title}</h6>
                    <span className="text-xs truncate" onClick={moveToMyPage}>{props.author}</span>
                </div>
            </div>
            <div>
                {props.isLike ? "♥" : "♡"} {props.like_cnt} | comments {props.comments_cnt}
            </div>
        </div>
    </div>
    )
}

export default Videoitem