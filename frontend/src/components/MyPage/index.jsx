import { Feed } from "./Feed/index";
import { Profile } from "./Profile/index";
// import * as Sty from "./style";

const MyPageComponent = () => {
  return (
    <>
      <Profile></Profile>
      <Feed></Feed>
    </>
  );
};

// const MyPageComponent = () => {
//   return (
//     <>
//       <Sty.Roww100>
//         <Profile></Profile>
//       </Sty.Roww100>

//       <Sty.SSticky>
//         <Feed></Feed>
//       </Sty.SSticky>
//     </>
//   )
// }


export { MyPageComponent };
