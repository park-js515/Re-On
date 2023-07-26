import React from 'react'
import ThumbNail from './ThumbNail'
import Info from './Info'
import SVideoItem from './style'

const VideoItem = (props) => {
    return (
        <SVideoItem>

            <ThumbNail
                thumbnail_url = {props.thumbnail_url}
                video_id = {props.video_id}
            >
            </ThumbNail>

            <Info
                profile_image_url = {props.profile_image_url}
                author = {props.author}
                title = {props.title}
                like_cnt = {props.like_cnt}
                comments_cnt = {props.comments_cnt}
                author_id = {props.author_id}
            >
            </Info>

        </SVideoItem>
    )
}

export default VideoItem