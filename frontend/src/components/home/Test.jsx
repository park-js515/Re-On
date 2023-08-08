
import React, { useState, useEffect } from 'react';
import Mainlottie from './Mainlottie';
const Test = () => {

    const posts = {
        backgroundImage: 'https://source.unsplash.com/random?sig=12',  
    }
    const posts2 = {
        backgroundImage: 'https://source.unsplash.com/random?sig=22',  
    }
    


  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    const offset = window.scrollY;
    if (offset > 800) { // 200px 스크롤 시 효과 적용
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-100">
            <Mainlottie/>    
      <section className={`transition-transform transition-opacity duration-500 ${scrolled ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}`}>
        <div className="bg-red-500 p-12 m-12 text-white">
            <div style={{ backgroundImage: `url(${posts.backgroundImage})` }} 
                className="w-full h-48 bg-cover bg-center featured-item cursor-pointer py-12 my-12 shadow-lg rounded" src={posts.backgroundImage} alt="">  
            </div>
        </div>
        
      </section>
    </div>
  );
}

export default Test;
