import './Feed.css';
import { useState } from 'react';
import * as hooks from './hooks';

const Container = ({ children }) => {
  return <div className="Feed-Container">{children}</div>;
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

  const setLists = [setList0, setList1, setList2];
  const srcs = [
    'images/MyPage/0002.jpg',
    'images/MyPage/0003.jpg',
    'images/MyPage/0004.jpg',
  ];
  const IDivs = createIDivs(4, setLists, srcs);

  const contents = [List0, List1, List2];
  const content = contents[tabNum];
  const Div = IDivs[tabNum]; // 관측 시 새로운 요청을 보내고 있음.

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
