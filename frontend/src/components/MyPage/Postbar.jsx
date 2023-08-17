import Posts from './Posts/Posts';
import Private from './Posts/Private';
import Likes from './Posts/Likes';

import React, { useState } from "react";
import Videolist from 'components/VideoComponent/Videolist';

const Postbar = ({myPage, email, changeShow, injectPostId, setIsPrivate}) => {

  const [activeComponent, setActiveComponent] = useState('Posts');

  return (
    <>
      <div className='mt-16 h-full min-h-full bg-gradient-to-t from-begie to-lightBlue '>
        <div className="flex items-center bg-white justify-center space-x-4 border-b-2 mb-12 border-gray md:space-x-12  uppercase tracking-widest font-semibold text-md ">
  
          <button
            className={`flex items-center space-x-2 px-5 py-2 font-semibold transition text-2xl
              ${activeComponent === 'Posts' ? 'text-lightBlue border-b-2 border-black' : 'text-black hover:text-lightBlue '}`}
            onClick={() => setActiveComponent('Posts')}
          >
            <span></span>
            <span>게시물</span>
          </button>
  
          {myPage &&
            <button
              className={`flex items-center space-x-2 px-5 py-2  font-semibold transition text-2xl
                ${activeComponent === 'Private' ? 'text-lightBlue border-b-2 border-black' : 'text-black hover:text-lightBlue '}`}
              onClick={() => setActiveComponent('Private')}
            >
              <span></span>
              <span>비공개</span>
            </button>}
  
          {myPage &&
            <button
              className={`flex items-center space-x-2 px-5 py-2  font-semibold transition text-2xl
                ${activeComponent === 'Likes' ? 'text-lightBlue border-b-2 border-black' : 'text-black hover:text-lightBlue '}`}
              onClick={() => setActiveComponent('Likes')}
            >
              <span></span>
              <span>좋아요</span>
            </button>}
  
        </div>
  
        {activeComponent === "Posts" && <Videolist type={activeComponent} injectPostId={injectPostId} changeShow={changeShow} setIsPrivate={setIsPrivate} />}
        {activeComponent === "Private" && <Videolist type={activeComponent} injectPostId={injectPostId} changeShow={changeShow} setIsPrivate={setIsPrivate} />}
        {activeComponent === "Likes" && <Videolist type={activeComponent} injectPostId={injectPostId} changeShow={changeShow} setIsPrivate={setIsPrivate} />}
      </div>
    </>
  );
};
export default Postbar;
