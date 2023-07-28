import * as Sty from "./style";

const CardTop = ({ children, ...props }) => {
  return <Sty.SCardTop {...props}>{children}</Sty.SCardTop>;
};

const CardBot = ({ children, ...props }) => {
  return <Sty.SCardBot {...props}>{children}</Sty.SCardBot>;
};

const FeedItem = ({ ...props }) => {
  return (
    <Sty.SDiv display="flex" {...props}>
      <CardTop></CardTop>
      <CardBot></CardBot>
    </Sty.SDiv>
  );
};

export { FeedItem };
