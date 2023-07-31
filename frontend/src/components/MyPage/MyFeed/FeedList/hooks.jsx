import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { FeedItem } from "./FeedItem/index";

const IDiv = ({ setItems, Component, src }) => {
  const { ref, inView } = useInView({
    threshold: 0.5,
  });

  useEffect(() => {
    const addItems = () => {
      const items = [];
      for (let i = 0; i < 3; i++) {
        items.push(
          <FeedItem top={process.env.PUBLIC_URL + src} bot={"temp"}></FeedItem>,
        );
      }
      setItems((current) => [...current, ...items]);
    };

    if (inView) {
      addItems();
    }
  }, [inView, setItems, src]);

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "30px",
        height: "300px",
        width: "100%",
      }}
    >
      EOP
    </div>
  );
};

export { IDiv };
