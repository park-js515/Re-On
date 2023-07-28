import { Profile } from "./Profile/index";
import { MyFeed } from "./MyFeed/index";
import * as Sty from "./style";

const MyPage = () => {
  return (
    <>
      <Sty.SRoww100>
        <Profile></Profile>
      </Sty.SRoww100>

      <Sty.SRoww100>
        <MyFeed></MyFeed>
      </Sty.SRoww100>
    </>
  );
};

export { MyPage };
