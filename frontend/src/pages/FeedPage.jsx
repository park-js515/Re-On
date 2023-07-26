import React from "react";
import VideoList from "components/common/VideoList/index";
import HotList from "components/common/HotList/index"
const FeedPage = () => {
  return (
    <div>
      <HotList></HotList>
      <VideoList></VideoList>
    </div>
  );
};

export default FeedPage;
