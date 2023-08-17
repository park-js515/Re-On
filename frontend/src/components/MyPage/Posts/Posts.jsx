import React, { useEffect, useState, useRef } from 'react';
import PostModal from '../Modal/PostModal';
import { searchPublicPost, searchPublicPostDetail } from 'apiList/post';

  const Posts = ({email}) => {
    //모달
    const [showModal, setShowModal] = useState(false);
    const [selectedPostId, setSelectedPostId] = useState();
    const [posts, setPosts] = useState([]);
    const [detailPost, setDetailPost] = useState();
    const [rest, setRest] = useState(true) // 더 로드할 영상이 있는지
    let page = 1;

    const getPosts = () => {
      if (rest){
        searchPublicPost(
          page,
          email,
          (response) => {
            const newdata = response.data.response
            if (newdata.length > 0){
              setPosts((posts) => {return [...posts, ...newdata]})
              page++;
              if (newdata.length < 10){
                setRest(false)
              }
            }
            else {
              setRest(false);
            }
          },
          (error) => {
            // console.log(error);
          }
          )
      }
    }

     const OpenModal = async(id) => {
      setSelectedPostId(id);

       await searchPublicPostDetail(id, (response) => {
        setDetailPost(response.data.response)
      }, (error) => {
        // console.log(error);
      })

      setShowModal(true);
    };


    // 무한 스크롤
    const target = useRef()
    const options = {
        threshold: 1
    };
    const observer = new IntersectionObserver(getPosts, options)

    useEffect(()=>{
        observer.observe(target.current)
        return ()=>{
            setPosts([])
        }
    }, []);

   
    return (
      <div className="bg-white py-24 sm:py-32 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:mt-1 sm:pt-1 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            
            {posts.map((post) => (
              <div key={post.id} className="flex max-w-xl shadow-md rounded flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg my-4 ">
                
                {/* 썸넬 */}
                <img 
                    src={ "https://storage.googleapis.com/reon-bucket/" + post.thumbnail }
                    className="w-full h-64 bg-cover bg-center rounded featured-item cursor-pointer" 
                    onClick={() => { OpenModal(post.id) }}
                    alt=""
                ></img>

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
                  getPosts = {getPosts}
                    />
                )
            }
          </div>
          <div className="text-center" ref={target}>{rest ? "🚝찾는중🚝" : "🛑모든 영상 로딩 완료🛑" }</div>
        </div>
      </div>
    );
}
export default Posts;