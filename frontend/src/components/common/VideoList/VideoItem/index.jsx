import React from 'react'
import ThumbNail from './ThumbNail'
import Info from './Info'
import { SThumbNail } from './style'
const VideoItem = (props) => {
    return (
        <SThumbNail>

            <ThumbNail
                thumbnail_url = {props.thumbnail_url}
            >
            </ThumbNail>

            <Info
                profile_image_url = {props.profile_image_url}
                author = {props.author}
                title = {props.title}
                like_cnt = {props.like_cnt}
            >
            </Info>

        </SThumbNail>
    )
}

export default VideoItem