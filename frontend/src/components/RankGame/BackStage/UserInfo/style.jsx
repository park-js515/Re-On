import styled from "styled-components";

export const SContainer = styled.div`
  cursor: pointer;
  position: relative;
  background: linear-gradient(
      var(--angle, 0deg),
      #8ccfd5 0%,
      #a0d3d8 10%,
      #8ccfd5 20%,
      #a0d3d8 30%,
      #b7d9db 40%,
      #e5e5e5 50%,
      #b7d9db 60%,
      #a0d3d8 70%,
      #8ccfd5 80%,
      #a0d3d8 90%,
      #8ccfd5 100%
    );
  background-size: cover;
  margin-top: 6vw;
  height: 20.5vw;
  width: 45vw;
  border-radius: 12px;
  color: #fff;
  box-shadow: 5px 5px 15px #c5c5c5;
  transition: all 300ms linear;
  box-shadow: 5px 5px 20px rgba(0, 0, 0, 0.5);
  
  &:hover {
    background: linear-gradient(
      var(--angle, 90deg),
      #8ccfd5 0%,
      #a0d3d8 10%,
      #8ccfd5 20%,
      #a0d3d8 30%,
      #b7d9db 40%,
      #e5e5e5 50%,
      #b7d9db 60%,
      #a0d3d8 70%,
      #8ccfd5 80%,
      #a0d3d8 90%,
      #8ccfd5 100%
    
      );
    /* background-size: 300% 100%;
    animation: holographicShimmer 2s infinite; */
    cursor: default;
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
    margin: calc(1vw + 3px) calc(1vw + 3px);
    display: flex;
    align-items: center;
    
    /* 이름 */
    .name {
     
      
      &:hover {
        color: #272727;
       
      }
    }
    /* 전적 */
    .recent {
      margin-left: 4px;
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
      background-origin: border-box;
      background-clip: content-box, border-box;
      &:hover {
        filter: blur(1px);
        opacity: 1px;
      }
    }
  }
`;

// 텍스트 div
export const STextContainer = styled.div`
  display: flex;
  justify-content: start;
  gap: 0.67vw;
  bottom: 10vw;
  margin: 1.5vw calc(0.5vw + 5px);
  z-index: 100;
  
  
`;

export const SRank = styled.div`
  user-select: none;
 
 position: relative;
 bottom: calc(10vw + 10px);
 right: calc(-30vw + 12px);

 
 img {
   width: 16vw;  // 반응형 너비로 설정
   height: 19.75vw; // 반응형 높이로 설정 (200px:250px의 비율 유지)
   max-width: 200px; // 최대 너비 제한 (선택적)
   max-height: 250px; // 최대 높이 제한 (선택적)
   min-height: 100px;
   min-width: 100px;
 }
`;
