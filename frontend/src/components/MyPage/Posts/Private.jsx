import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchPrivatePost, searchPrivatePostDetail } from 'apiList/post';

  const Private = () => {
    //모달
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPost, setSelectedPost] = useState(null);
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();


    const openModal = (post) => {

      searchPrivatePostDetail(post.id,(response) => {
        console.log(response.data.response);
        setSelectedPost(response.data.response);
        setIsModalOpen(true) },
        (error) => {
          console.log(error)
          navigate('/login');
        }
      )
      // axios.get(
      //   process.env.REACT_APP_API + `/api/post-management/post/${post.id}`,{
      //     headers: {
      //       "Authorization": `Bearer ${localStorage.getItem('accessToken')}`,
      //       'Content-Type': 'application/json',
      //     },
      //   },
      // )
      // .then((response) => {
      //   console.log(response.data.response);
      //   setSelectedPost(response.data.response);
      //   setIsModalOpen(true);

      // })
      // .catch((error) => {
      //   console.log(error)
      //   navigate('/login');
      // });
    }

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPost(null);
    }

    useEffect(() => {
      const test = () => {

        searchPrivatePost(1, (response) => {
          console.log(response.data.response);
          setPosts(response.data.response)
        },
          (error) => {
            console.log(error)
          }
        )
        // await axios
        //   .get(
        //     process.env.REACT_APP_API + `/api/post-management/post/private?offset=1`,
        //     {
        //       headers: {
        //         "Authorization": `Bearer ${accessToken}`,
        //         'Content-Type': 'application/json',
        //       },
        //     },
        //   )
        //   .then((response) => {
        //     console.log(response.data.response);
        //     setPosts(response.data.response)
        //   })
        //   .catch((error) => {
        //     console.log(error)
        //   });
      };
      test();
    }, []);

    return (
      <div className="bg-white py-24 sm:py-32">
        {/* 모달창 */}
        {isModalOpen && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-4 rounded-md">
                        {/* <img src={selectedPost.thumbnail} alt={selectedPost.title} className="w-full h-64 object-cover mb-4" /> */}
              {/* <h3>{selectedPost.title}</h3> */}
              <video style={{ 'width': "500px" }} autoPlay src={"https://storage.googleapis.com/reon-bucket/"+selectedPost.actionPath}/>
                        <button onClick={closeModal} className="mt-4 px-4 py-2 bg-red-500 text-black rounded-md">닫기</button>
                    </div>
                </div>
        )}
        
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto  grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:mt-1 sm:pt-1 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {/* 사진 */}
            {posts.map((post) => (
              <div key={post.id} className="flex shadow-md rounded max-w-xl flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg my-2 ">  
                 <div 
                    style={{ backgroundImage: `url(${post.thumbnail})` }} 
                    className="w-full h-64 bg-cover bg-center rounded featured-item cursor-pointer"
                    onClick={() => openModal(post)}
                ></div>

                 <div className="group relative ml-2 pb-4 ">
                    <h3 className="mt-3 text-lg leading-6 text-gray-900 group-hover:text-gray-600">
                    <h4>{post.title}</h4>
                    <span className="text-2xl hover:underline hover:decoration-solid hover:cursor-pointer">{post.createDate}</span>
                    </h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
}
export default Private;