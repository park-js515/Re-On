import styled from 'styled-components';

export const SContainer = styled.main`
  width: 100%;
  .main__section {
    font-weight: 400;
    position: relative;
    width: 100%;
    height: 900px;
    background: linear-gradient(to right top, beige, lightBlue);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  
    h1 {
   
      font-size: calc(10vw + 40px);
      margin-bottom: calc(1vw + 30px);
      margin-top: calc(1vw + 1px);
    }
    h3 {
      
      font-size: calc(2vw + 12px);
      margin-left: 15px;
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
      width: calc(4vw + 800px);
      margin-left: calc(2vw + 80px);
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
