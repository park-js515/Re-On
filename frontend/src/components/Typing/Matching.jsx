import React from 'react';
import { useEffect, useState } from 'react';
import { SMatchingTyping } from './matchingStyles';

const Typing = ({ typingContent }) => {
  const [typingInnerContent, setTypingInnerContent] = useState('');
  const [count, setCount] = useState(0);
  const [typingChangeFlag, setTypingChangeFlag] = useState(false);

  useEffect(() => {
    let typingInterval;
    if (!typingChangeFlag) {
      typingInterval = setInterval(() => {
        setTypingInnerContent((prevInnerCotent) => {
          let nextInnerContent = prevInnerCotent
            ? prevInnerCotent + typingContent[count]
            : typingContent[0];
          setCount(count + 1);

          if (count === typingContent.length - 1) {
            setTypingChangeFlag(true);
          }

          return nextInnerContent;
        });
      }, 200);
    } else {
      const sleep = (delay) =>
        new Promise((resolve) => setTimeout(resolve, delay));

      async function test() {
        if (count === 14) {
          await sleep(5000);
          setCount(12);
        }
        typingInterval = setInterval(() => {
          setTypingInnerContent(() => {
            let nextInnerContent = typingContent.slice(0, count);
            setCount(count - 1);

            if (count === 0) {
              setTypingChangeFlag(false);
              setCount(0);
              setTypingInnerContent('');
            }

            return nextInnerContent;
          });
        }, 100);
      }

      test();
    }

    return () => {
      clearInterval(typingInterval);
    };
  });

  return (
    <SMatchingTyping>
      <div>
        <span className="content">게임 찾는 중{typingInnerContent}</span>
      </div>
    </SMatchingTyping>
  );
};

export default React.memo(Typing);
