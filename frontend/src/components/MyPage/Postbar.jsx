import Posts from './Posts/Posts';
import Private from './Posts/Private';
import Likes from './Posts/Likes';

import React, { useState } from "react";


const Postbar = ({myPage, email}) => {

  const [activeComponent, setActiveComponent] = useState('Posts');
  return (
    <>
      <ul className="flex items-center justify-around md:justify-center space-x-12 uppercase tracking-widest font-semibold text-xs text-gray-600 z-0">
        <div className="flex flex-row mt-4 justify-center mr-16">

          <div className="flex text-gray-700 text-center py-2 m-4 pr-5">
            <div className="flex">
            <button
              className={`px-4 py-2 rounded-full 
              ${activeComponent === 'Posts' ? 'bg-begie text-black' : 'text-black hover:text-lightBlue'}`}
              onClick={() => setActiveComponent('Posts')}
            >
              <h3 className="text-sm font-bold">🌻게시물</h3>
            </button>
            </div>
          </div>
          {myPage &&
          <div className="flex text-gray-700 text-center py-2 m-4 pr-5">
            <div className="flex">
            <button
              className={`px-4 py-2 rounded-full 
              ${activeComponent === 'Private' ? 'bg-begie text-black' : 'text-black hover:text-lightBlue'}`}
              onClick={() => setActiveComponent('Private')}
            >
              <h3 className="text-sm font-bold">💾비공개</h3>
            </button>
            </div>
          </div>}
          
          {myPage &&
          <div className="flex text-gray-700 text-center py-2 m-4 pr-5">
            <div className="flex">
            <button
              className={`px-4 py-2 rounded-full 
              ${activeComponent === 'Likes' ? 'bg-begie text-black' : 'text-black hover:text-lightBlue'}`}
              onClick={() => setActiveComponent('Likes')}
            >
              <h3 className="text-sm font-bold">💌내가좋아한</h3>
            </button>
            </div>
          </div>}
          </div>
      </ul>
      {activeComponent === 'Posts' && <Posts email={email} />}
      {activeComponent === 'Private' && <Private email={email}/>}
      {activeComponent === 'Likes' && <Likes email={email}/>}
    </>
  );
};
export default Postbar;
