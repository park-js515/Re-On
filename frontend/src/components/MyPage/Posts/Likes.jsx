import React, { useState, useEffect } from 'react';
import LikesModal from '../Modal/LikesModal';
import { useNavigate } from 'react-router-dom';

import { searchLikePost, searchPublicPostDetail } from 'apiList/post';

  const Likes = () => {
    const navigate = useNavigate()

    //모달
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState(null);
    const [posts, setPosts] = useState([]);
    const [detailPost, setDetailPost] = useState();


    useEffect(() => {
      const getPosts = () => {
        searchLikePost(1, (response) => {
          console.log(response.data.response);
          setPosts(response.data.response)
        }, (error) => {
          console.log(error);
        })
      }
      getPosts();
    },[]);

    const getPosts = () => {
      searchLikePost(1, (response) => {
        console.log(response.data.response);
        setPosts(response.data.response)
      }, (error) => {
        console.log(error);
      })
    }

    const OpenModal = async(id) => {
      setSelectedPostId(id);

       await searchPublicPostDetail(id, (response) => {
        setDetailPost(response.data.response)
      }, (error) => {
        console.log(error);
      })

      setShowModal(true);
    };

    const moveMyPage = (email) => {
      navigate("/mypage/"+email)
    }

    return (
    <div className="bg-white py-24 sm:py-32">
    <div className="mx-auto max-w-7xl px-6 lg:px-8">
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:mt-1 sm:pt-1 lg:mx-0 lg:max-w-none lg:grid-cols-3">
        
        {posts.map((post) => (
          <div key={post.id} className="flex shadow-lg rounded max-w-xl flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg my-6 pb-2">
            {/* 썸네일 상단 */}
            <div className="relative flex justify-between items-center w-full mt-4 gap-x-4 px-2 mb-1">
                {/* 프로필  */}
                <div className="flex items-center gap-x-4">
                  <img src={post.profileImg} alt=""className="h-10 w-10 rounded-full bg-gray-50" />
                  <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                      <span className="text-xs hover:underline hover:decoration-solid hover:cursor-pointer" onClick = {()=>{moveMyPage(post.email)}}>{post.nickName}</span>
                      </p>
                  </div>
                </div>
                {/* 년원일 */}
                <div className="text-sm leading-6 text-gray-700 font-semibold">
                  {post.createDate.substr(0,4)}년 {post.createDate.substr(5,2)}월 {post.createDate.substr(8,2)}일
                </div>
            </div>
                
              {/* 썸넬 */}
                <div 
                    style={{ backgroundImage: `url(${post.thumbnail})` }} 
                    className="w-full h-64 bg-cover bg-center rounded featured-item cursor-pointer" 
                    onClick={() => { OpenModal(post.id) }}
                    alt=""
                ></div>

                {/* 좋아요 */}
                <div className="flex items-center gap-x-4 text-xs ml-2">
                  <div className="text-gray-500 font-semibold">
                      <span className="text-lg">💙</span>좋아요 {post.likeCnt}
                  </div>

                  <div className="text-gray-500 font-semibold">
                      <span className="text-lg">💬</span>댓글 {post.commentCnt}
                  </div>
                </div>
                
                <div className="group relative ml-2">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="text-2xl hover:underline hover:decoration-solid hover:cursor-pointer">{post.title}</span>
                    </h3>
                </div>
                
    
              </div>
            ))}
            {
                showModal && (
                    <LikesModal 
                    detailPost={detailPost} 
                  changeShow={() => setShowModal(false)}
                  getPosts = {getPosts}
                    />
                )
            }
          </div>
    
        </div>
      </div>
    );
}
export default Likes;




