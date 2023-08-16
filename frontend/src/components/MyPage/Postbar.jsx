import Posts from './Posts/Posts';
import Private from './Posts/Private';
import Likes from './Posts/Likes';

import React, { useState } from "react";
import Videolist from 'components/VideoComponent/Videolist';

const Postbar = ({myPage, email, changeShow, injectPostId, setIsPrivate}) => {

  const [activeComponent, setActiveComponent] = useState('Posts');

  return (
    <>
    <div className='mt-24 h-screen min-h-screen bg-gradient-to-b from-begie  to-[#a4dbe0] border-t-2'>
      <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-md ">
        <div className="flex flex-row mt-4 justify-center ">

          <div className="flex text-center py-2 m-4 pr-5">
            <div className="flex">
            <button
              className={`px-4 py-2 rounded-full 
              ${activeComponent === 'Posts' ? ' text-lightBlue' : 'text-black hover:text-lightBlue'}`}
              onClick={() => setActiveComponent('Posts')}
            >
              <h3 className="text-xl font-bold">🌻게시물</h3>
            </button>
            </div>
          </div>
          {myPage &&
          <div className="flex text-center py-2 m-4 pr-5">
            <div className="flex">
            <button
              className={`px-4 py-2 rounded-full 
              ${activeComponent === 'Private' ? 'text-lightBlue' : 'text-black hover:text-lightBlue'}`}
              onClick={() => setActiveComponent('Private')}
            >
              <h3 className="text-xl font-bold">💾비공개</h3>
            </button>
            </div>
          </div>}
          
          {myPage &&
          <div className="flex text-center py-2 m-4 pr-5">
            <div className="flex">
            <button
              className={`px-4 py-2 rounded-full 
              ${activeComponent === 'Likes' ? 'text-lightBlue border-t-black' : 'text-black hover:text-lightBlue'}`}
              onClick={() => setActiveComponent('Likes')}
            >
              <h3 className="text-xl font-bold">💌내가좋아한</h3>
            </button>
            </div>
          </div>}
          </div>
      </ul>
      {activeComponent === "Posts" && <Videolist type={activeComponent} injectPostId={injectPostId} changeShow={changeShow} setIsPrivate={setIsPrivate}/>}
      {activeComponent === "Private" && <Videolist type={activeComponent} injectPostId={injectPostId} changeShow={changeShow} setIsPrivate={setIsPrivate}/>}
      {activeComponent === "Likes" && <Videolist type={activeComponent} injectPostId={injectPostId} changeShow={changeShow} setIsPrivate={setIsPrivate}/>}
      </div>
    </>
  );
};
export default Postbar;
