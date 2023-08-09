import React from 'react';

  const Likes = () => {
    const temp = [];
    for (let i = 1; i <= 10; i++){
        temp.push({
            id: i,
            title: `제목 넘버-${i}`,
            likes: 2400,
            backgroundImage: `https://source.unsplash.com/random?sig=10${i}`,
            comment_cnt: 20,
            profile_img:`https://source.unsplash.com/random?sig=10${i}`,
            nick_name:`두껍희창${i}`
        });
    }
    const posts = temp;
    
    return (
      <div className="bg-white py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-4 sm:mt-1 sm:pt-1 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="flex shadow-md rounded max-w-xl flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg my-6 pb-2">
                
                
                 <div style={{ backgroundImage: `url(${post.backgroundImage})` }} 
                 className="w-full h-64 bg-cover bg-center rounded featured-item cursor-pointer" src={post.backgroundImage} alt="">

                 </div>

                
                <div className="flex items-center gap-x-4 text-xs ml-2">
                <div className="text-gray-500">
                    <span className="text-xl">💙</span>좋아요 {post.likes}
                </div>

                <div className="text-gray-500">
                    <span className="text-xl">💬</span>댓글 
                </div>
                  
                    
                  
                </div>
                
                <div className="group relative ml-2">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="text-2xl hover:underline hover:decoration-solid hover:cursor-pointer">{post.title}</span>
                    </h3>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4 ml-2 mb-1">
                    <img src={post.profile_img} alt=""className="h-10 w-10 rounded-full bg-gray-50" />
                    <div className="text-sm leading-6">
                        <p className="font-semibold text-gray-900">
                         <span className="text-xs hover:underline hover:decoration-solid hover:cursor-pointer">{post.nick_name}</span>
                        </p>
                    </div>
                </div>
                
    
              </div>
            ))}
          </div>
    
        </div>
      </div>
    );
}
export default Likes;