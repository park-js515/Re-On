import styled from 'styled-components';

export const SMatchingTyping = styled.section`
  user-select: none;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 700;
    font-size: 24px;
    background: linear-gradient(to right top, white, white);
    color: transparent;
    -webkit-background-clip: text;
  }
  span::after {
    content: '|';
    display: inline-block;
    font-size: 24px;
    animation: moveCursor 500ms infinite;
    color: white;
  }

  @keyframes moveCursor {
    from {
      opacity: 1;
    }

    to {
      opacity: 0;
    }
  }
`;
