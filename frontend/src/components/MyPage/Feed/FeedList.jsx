import { useState } from "react";
import * as hooks from "./hooks";

const Container = ({ children }) => {
  return (
    <div
      style={{
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        flexWrap: "wrap",
        gap: "20px",
        overflow: "hidden",
      }}
    >
      {children}
    </div>
  );
};

// const Item = ({ children }) => {
//   return (
//     <div
//       style={{
//         boxSizing: "border-box",
//         flex: "0 0 calc(25% - 20px)",
//       }}
//     ></div>
//   );
// };

const createIDivs = (n, lists, srcs) => {
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(<hooks.IDiv setItems={lists[i]} src={srcs[i]}></hooks.IDiv>);
  }

  return arr;
};

const FeedList = ({ tabNum }) => {
  const [List0, setList0] = useState([]);
  const [List1, setList1] = useState([]);
  const [List2, setList2] = useState([]);
  const [List3, setList3] = useState([]);

  const setLists = [setList0, setList1, setList2, setList3];
  const srcs = [
    "images/MyPage/0002.jpg",
    "images/MyPage/0003.jpg",
    "images/MyPage/0004.jpg",
    "images/MyPage/0005.jpg",
  ];
  const IDivs = createIDivs(4, setLists, srcs);

  const contents = [List0, List1, List2, List3];
  const content = contents[tabNum];
  const Div = IDivs[tabNum];

  return (
    <>
      <Container>
        {content.map((item) => {
          return item;
        })}
        {Div}
      </Container>
    </>
  );
};

export { FeedList };
