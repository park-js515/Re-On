import React, { useEffect, useState } from 'react';
import PostModal from '../Modal/PostModal';
import { searchPublicPost, searchPublicPostDetail } from 'apiList/post';

  const Posts = () => {

    //모달
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState();
    const [posts, setPosts] = useState([]);
    const [detailPost, setDetailPost] = useState();


    useEffect(() => {
      const getPosts = () => {
        searchPublicPost(1, 1, (response) => {
          console.log(response.data.response);
          setPosts(response.data.response)
        }, (error) => {
          console.log(error);
        })
      }
      getPosts();
    },[]);

    const getPostDetail = (id) => {
      searchPublicPostDetail(id, (response) => {
        console.log("zz");
        console.log(response.data.response);
        setDetailPost(response.data.response)
      }, (error) => {
        console.log(error);
      })
    };
    
    const OpenModal = (id) => {
      console.log(id);
      setSelectedPostId(id);
      getPostDetail(id);
      setShowModal(true);
    };



   
    return (
      <div className="bg-white py-24 sm:py-32 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto rounded grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:mt-1 sm:pt-1 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="flex max-w-xl shadow-md rounded flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg my-4 ">
                
                {/* 썸넬 */}
                <div 
                    style={{ backgroundImage: `url(${post.thumbnail})` }} 
                    className="w-full h-64 bg-cover bg-center rounded featured-item cursor-pointer" 
                  onClick={() => { OpenModal(post.id)}}
                    alt=""
                ></div>

                {/* 좋아요 */}
                <div className="flex items-center gap-x-4 text-xs ml-2">
                  <div className="text-gray-500 font-semibold"><span className="text-lg">💙</span>좋아요 {post.likeCnt}</div>
                  <div className="text-gray-500 font-semibold"><span className="text-lg">💬</span>댓글 {post.commentCnt}</div>
                </div>
                {/* 제목이에용 */}
                <div className="group relative ml-2 pb-6 ">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="text-2xl hover:underline hover:decoration-solid hover:cursor-pointer">{post.title}</span>
                    </h3>
                </div>
              </div>
            ))}
            {/* 모달창이에용 */}
            {
                showModal && (
                    <PostModal 
                    detailPost={detailPost} 
                        changeShow={() => setShowModal(false)}
                    />
                )
            }
          </div>
        </div>
      </div>
    );
}
export default Posts;