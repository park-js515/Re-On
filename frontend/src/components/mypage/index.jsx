import { Profile } from "./Profile/index";
import { MyFeed } from "./MyFeed/index";
import * as Sty from "./style";
// import { useState, useEffect, useRef, forwardRef } from "react";

const MyPageComponent = () => {
  return (
    <>
      <Sty.SRoww100>
        <Profile></Profile>
      </Sty.SRoww100>

      <Sty.SSticky>
        <MyFeed style={{position: "sticky"}}></MyFeed>
      </Sty.SSticky>
    </>
  );
};

export { MyPageComponent };
