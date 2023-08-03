import Hotlist from "components/VideoComponent/Hotlist";
import Videolist from "components/VideoComponent/Videolist";
import Videoplayer from "components/VideoComponent/Videoplayer";
import { useState } from "react";
const FeedPage = () => {
  const [show, setShow] = useState(false);
  const [vi, setVi] = useState(null);

  const changeShow = () => {
    setShow((show)=>{return !show})
  }
  const injectVideoID = () => {
    setVi()
  }

  return (
      <div className="w-3/4 mx-auto">

        <Hotlist
          injectVideoID={injectVideoID}
          changeShow={changeShow}
        />

        <Videolist
          injectVideoID={injectVideoID}
          changeShow={changeShow}
        />

        {show ? <Videoplayer changeShow={changeShow} vi={vi}/> : null}
        
      </div>
  );
};

export default FeedPage;
