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

  if (show) {
    var x=window.scrollX;
    var y=window.scrollY;
    window.onscroll=function(){window.scrollTo(x, y);};
  }
  else {
    window.onscroll=function(){};
  }

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
