import { SBox1, SBox2 } from "./style";

const Box1 = ({ children }) => {
  return <SBox1>{children}</SBox1>;
};

const Box2 = ({ children }) => {
  return <SBox2>{children}</SBox2>;
};

export { Box1, Box2 };
