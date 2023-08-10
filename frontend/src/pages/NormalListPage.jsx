import SoloApp from "components/Solo/Solo";
import { useState } from "react";

const NoramalListPage = () => {
  const urls = [
    'video/ISawTheDevil.mp4',
    'video/아저씨-원빈-금니빨.mp4',
  ]
  const [cnt, setCnt] = useState(0)
  const [url,setUrl] = useState(urls[0])

  const getURL = () => {
    setUrl(urls[(cnt+1)%urls.length])
    setCnt(cnt+1)
  }
  return (
    <div>
      <SoloApp video_url={url}></SoloApp>
      <button onClick={getURL}>change</button>
    </div>
  );
};

export default NoramalListPage;
