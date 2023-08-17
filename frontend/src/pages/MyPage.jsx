import { Container } from '@mui/system';
import Postbar from "components/MyPage/Postbar"
import MyPageMine from "components/MyPage/MyPageMine"
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Videoplayer from 'components/VideoComponent/Videoplayer';
import ImageCarousel from "../components/login/ImageCarousel.jsx"
import "../components/login/ImageCarousel.css"
const MyPage = () => {
    //내 페이지인지
  const [myPage, setMyPage] = useState(false);
  const { email } = useParams();

  const [show, setShow] = useState(false);
  const [post_id, setPostId] = useState(null);

  const [isPrivate, setIsPrivate] = useState(false);

  const changeShow = () => {
    if (show) {
      setShow(false)
      allowScroll(preventScroll())
    }
    else {
      setShow(true)
      preventScroll()
    }
  }

  const injectPostId = (arg) => {
    setPostId(arg)
  }

  const preventScroll = () => {
    const currentScrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${currentScrollY}px`; // 현재 스크롤 위치
    document.body.style.overflowY = 'scroll';
    return currentScrollY;
  };

  const allowScroll = (prevScrollY) => {
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflowY = '';
    window.scrollTo(0, prevScrollY);
  };

  useEffect(() => {
    return () => {
      if (show){
        changeShow()
      }
    }
  }, [])
  
  return (
    <div className='pt-8'>
      
        <div className="absolute top-0 left-0 w-full z--1 h-full z-0 grid-carousel bg-white">
            <ImageCarousel/>
        </div>
        
     
        <div className="relative">
            <Container>
                <div>
                    <MyPageMine setMyPage={setMyPage} email={email}/>
                </div>
            </Container>
        </div>

        <div className="relative">
            <Postbar myPage={myPage} email={email} changeShow={changeShow} injectPostId={injectPostId} setIsPrivate={setIsPrivate}/>
            {show ? <Videoplayer changeShow={changeShow} post_id={post_id} isPrivate={isPrivate}/> : null}
        </div>
    </div>
)

};

export default MyPage;

