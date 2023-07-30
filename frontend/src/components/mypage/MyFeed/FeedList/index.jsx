import { useState } from "react";
// import { FeedItem } from "./FeedItem/index";
import * as Sty from "./style";
import { IDiv } from "./hooks";

// const List1 = new Array(108).fill(0).map((_, index) => {
//   return (
//     <FeedItem
//       key={index}
//       top="images/1139.jpg"
//       bot={`Public's bot ${index}th`}
//     ></FeedItem>
//   );
// });
// const List2 = new Array(101).fill(0).map((_, index) => {
//   return (
//     <FeedItem
//       key={index}
//       top={"images/1552.jpg"}
//       bot={`Private's bot ${index}th`}
//     ></FeedItem>
//   );
// });
// const List3 = new Array(120).fill(0).map((_, index) => {
//   return (
//     <FeedItem
//       key={index}
//       top={`images/1674.jpg`}
//       bot={`Like's bot ${index}th`}
//     ></FeedItem>
//   );
// });
// const List4 = new Array(100).fill(0).map((_, index) => {
//   return (
//     <FeedItem
//       key={index}
//       top={`images/0030.jpg`}
//       bot={`Uploaded's bot ${index}th`}
//     ></FeedItem>
//   );
// });

const createIDivs = (n, lists, srcs) => {
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(<IDiv setItems={lists[i]} src={srcs[i]}></IDiv>);
  }

  return arr;
};

const FeedList = ({ tabNum }) => {
  const [List0, setList0] = useState([]);
  const [List1, setList1] = useState([]);
  const [List2, setList2] = useState([]);
  const [List3, setList3] = useState([]);

  const setLists = [setList0, setList1, setList2, setList3];
  const srcs = ["/image/profile/신세계.jpg", "./image/profile/타짜.jpg", "./image/profile/킹스맨.jpg", "./image/profile/미션임파서블.jpg"];
  const IDivs = createIDivs(4, setLists, srcs);
  
  const contents = [List0, List1, List2, List3];
  const content = contents[tabNum];
  const Div = IDivs[tabNum];  

  return (
    <>
      <Sty.SContainer>
        {content.map((card) => {
          return card;
        })}

        {Div}
      </Sty.SContainer>
    </>
  );
};

export { FeedList };
