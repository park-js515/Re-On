import styled from 'styled-components';

export const SSection = styled.section`
  user-select: none;
  width: 100%;
  height: calc(1vh + 150px);
  display: flex;
  justify-content: center;
  align-items: center;
  span {
    font-weight: 700;
    font-size: calc(1vw + 28px);
    background: linear-gradient(to right top, #d4e6a0, #8ccfd5);
    color: transparent;
    -webkit-background-clip: text;
  }
  span::after {
    content: '|';
    display: inline-block;
    font-size: calc(1vw + 32px);
    animation: moveCursor 500ms infinite;
    color: #d4e6a0;
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
