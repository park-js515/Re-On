import React from 'react';

  const Posts = () => {
    const temp = [];
    for (let i = 1; i <= 10; i++){
        temp.push({
            id: i,
            title: `제목 넘버-${i}`,
            likes: 2400,
            backgroundImage: `https://source.unsplash.com/random?sig=${i}`,
            comment_cnt: 20,
        });
    }
    const posts = temp;
   
    return (
      <div className="bg-white py-24 sm:py-32 ">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto rounded grid max-w-2xl grid-cols-1  gap-x-8 gap-y-4 sm:mt-1 sm:pt-1 lg:mx-0 lg:max-w-none lg:grid-cols-3">
            {posts.map((post) => (
              <div key={post.id} className="flex max-w-xl shadow-md rounded flex-col items-start justify-between transform transition-transform duration-300 hover:scale-105 hover:shadow-lg my-4 ">
                
                <div style={{ backgroundImage: `url(${post.backgroundImage})` }} 
                 className="w-full h-64 bg-cover bg-center rounded featured-item cursor-pointer" src={post.backgroundImage} alt="">
                    
                 </div>
                {/* 좋아요 */}
                <div className="flex items-center gap-x-4 text-xs ml-2">
                  <div className="text-gray-500">💙좋아요 {post.likes}</div>
                  <div className="text-gray-500">💬댓글 {post.comment_cnt}</div>
                </div>
                
                <div className="group relative ml-2 pb-6 ">
                    <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    <span className="text-2xl hover:underline hover:decoration-solid hover:cursor-pointer">{post.title}</span>
                    </h3>
                </div>
                
                
    
              </div>
            ))}
          </div>
    
        </div>
      </div>
    );
}
export default Posts;