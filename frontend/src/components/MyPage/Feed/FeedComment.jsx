import { useState } from 'react';
import './Feed.css';

const CommentContainer = ({ children, style, ...props }) => {
  return (
    <div className="Feed-CommentContainer" style={{ ...style }} {...props}>
      {children}
    </div>
  );
};

const CommentChild = ({ children, style, ...props }) => {
  return (
    <div className="Feed-CommentChild" style={{ ...style }} {...props}>
      {children}
    </div>
  );
};

const Comment = ({ text, childComments, style, ...props }) => {
  const [showChild, setShowChild] = useState(false);

  const handleSetShowChild = () => {
    setShowChild((current) => !current);
  };

  return (
    <>
      <div
        className="Feed-Comment"
        style={{ ...style }}
        {...props}
        onClick={handleSetShowChild}
      >
        {text}
      </div>

      {showChild
        ? childComments.map((child, index) => {
            return <CommentChild key={index}>{child}</CommentChild>;
          })
        : null}
    </>
  );
};

export { CommentContainer, Comment, CommentChild };
