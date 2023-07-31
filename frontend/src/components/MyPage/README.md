### 미구현 사항

> 디자인
- 아직 적용되지 않음.
- 모달, 사이즈 등...

> 통신
- 비동기 함수가 필요할 것으로 생각됨

  - 데이터 로드 -> 보여주기
  - <s>https://api.thecatapi.com/v1/images/search</s>

> 무한 스크롤

- Intersection Observer API
- https://velog.io/@sjoleee_/React-%EB%AC%B4%ED%95%9C-%EC%8A%A4%ED%81%AC%EB%A1%A4

- **공식문서**
  - https://github.com/thebuilder/react-intersection-observer#readme

```js
// 예시

import { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const App = () => {
  const [items, setItems] = useState([]);
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    const addItems = () => {
      const imgs = [];
      for (let i = 0; i < 1; i++) {
        imgs.push(
          <img
            src={process.env.PUBLIC_URL + "/images/1155.jpg"}
            key={i}
            alt="alt"
          />
        );
      }
      setItems((current) => [...current, imgs]);
    };

    if (inView) {
      console.log("무한 스크롤링 요청!");
      addItems();
    }
  }, [inView, setItems]);

  return (
    <>
      {items.map((item) => {
        return item;
      })}
      <div
        ref={ref}
        style={{
          width: "100%",
          height: "300px",
          backgroundColor: "rgba(193, 190, 190, 0.515)",
        }}
      ></div>
    </>
  );
};

export default App;
```

