import styled from "styled-components";

export const SContainer = styled.div`
  cursor: pointer;
  position: relative;
  background-color: #fff;
  background-size: cover;
  height: 20.5vw;
  width: 55.5vw;
  border-radius: 12px;
  color: #000000;
  box-shadow: 5px 5px 15px #c5c5c5;
  transition: all 300ms linear;

  &:hover {
    transform: translateY(-3%);
    cursor: default;
  }
  &:hover .sns__container {
    opacity: 1;
  }
  .sns__container {
    width: 100%;
    height: 80%;
    position: absolute;
    bottom: 0;
    opacity: 0;
    z-index: -1;
    border-radius: 12px;
   
    
  }

  /* 프로필 사진과 이름, 점수를 묶는 div */
  .profile-container {
    margin: calc(0.5vw + 3px) calc(0.5vw + 5px);
    display: flex;
    align-items: center;
    
    /* 이름 */
    .name {
      margin: 0;
      font-size: xxx-large;
      font-weight: bold;
      &:hover {
        transform: translateY(-5%);
      }
    }
    /* 전적 */
    .recent {
      font-size: large;
      color: #3c3c3c;
    }
    /* 점수 */
    .wdl {
      margin: 0px;
      margin-top: 0.5vw;
   
    }
    /* 프로필 사진 */
    img {
      width: 10vw;
      height: 10vw;
      margin-right: calc(0.5vw + 2px);
      border: 3px solid transparent;
      border-radius: 50%;
      object-fit: cover;
      text-align: center;
      background-image: linear-gradient(#fff, #fff),
        linear-gradient(to right, #D4E6A0 0%, #D4E6A0 100%);
      background-origin: border-box;
      background-clip: content-box, border-box;
      &:hover {
        transform: translateY(-5%);
      }
    }
  }
`;

// SNS 링크를 묶는 div
export const SSNSContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.67vw;
  bottom: 10vw;
  margin: 1.5vw calc(0.5vw + 5px);
  z-index: 100;
  
  
`;

export const SRank = styled.div`
  user-select: none;
 
  position: absolute;
  bottom: calc(4vw + 1px);
  right: calc(3vw + 12px);
  z-index: 100;
  img {
    width: 200px;  // 원하는 너비로 설정
    height: 250px; // 원하는 높이로 설정
  }
`;
