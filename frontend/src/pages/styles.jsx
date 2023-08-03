import styled from "styled-components";

export const SContainer = styled.main`
  width: 100%;
  .main__section {
    font-weight: 400;
    position: relative;
    width: 100%;
    height: 550px;
    background: linear-gradient(to top left, beige, lightBlue);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  }
    h1 {
      

      margin: 0px;
      font-size: calc(2vw + 28px);
      margin-bottom: calc(1vw + 30px);
      margin-top: calc(1vw + 1px);
    }
    h3 {
      
      font-size: calc(1vw + 11px);
      margin: 0px;
      line-height: calc(1vw+40px);
    }
    h4 {

      font-size: calc(1vw + 3px);
      margin: 0px;
      line-height: calc(1vw+20px);
      color: #787878;
    }
    & > div {
      display: flex;
      justify-content: center;
      .main__content {
        display: flex;
        flex-direction: column;
        justify-content: center;
      }
    }
    .lottie-container {
      cursor: pointer;
      width: calc(2vw + 600px);
      margin-left: calc(2vw + 80px);
    }
  }

  .typing__action {
    width: 100%;
    height: 150px;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 36px;
      color: #f3bd2a;
    }
    span::after {
      content: "|";
      display: inline-block;
      font-size: 50px;
      animation: moveCursor 500ms infinite;
    }

    @keyframes moveCursor {
      from {
        opacity: 1;
      }

      to {
        opacity: 0;
      }
    }
  }
`;
