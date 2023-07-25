import React from "react"
import { SThumbNail } from "./style"

const ThumbNail = (props) => {
    return (
        <SThumbNail src={props.thumbnail_url} alt="No ThumbNail"></SThumbNail>
    )
}

export default ThumbNail