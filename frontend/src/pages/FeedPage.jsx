import Hotlist from "components/VideoComponent/Hotlist";
import Videolist from "components/VideoComponent/Videolist";
import Videoplayer from "components/VideoComponent/Videoplayer";
import { useState, useEffect } from "react";

const FeedPage = () => {
  const [show, setShow] = useState(false);
  const [vi, setVi] = useState(null);

  const changeShow = () => {
    if (show) {
      setShow(false)
      allowScroll(0)
    }
    else {
      setShow(true)
      preventScroll()
    }
  }

  const injectVideoID = () => {
    setVi()
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
    <div>

      <div className={show? "w-3/4 mx-auto blur-md" : "w-3/4 mx-auto"}>
        <Hotlist
          injectVideoID={injectVideoID}
          changeShow={changeShow}
          />

        <Videolist
          injectVideoID={injectVideoID}
          changeShow={changeShow}
          />
      </div>

      {show ? <Videoplayer changeShow={changeShow} vi={vi}/> : null}

    </div>
  );
};

export default FeedPage;
