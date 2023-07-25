import styled from "styled-components";

const SBox1 = styled.div`
  box-sizing: border-box;
  background-color: #2f2c2c;
  height: 80vh;
  width: 25vw;
  border-radius: 15px;
  padding: 10px;

  margin: 10px;
`;

const SBox2 = styled.div`
  box-sizing: border-box;
  background-color: #808080d1;
  width: 100%;
  aspect-ratio: 4 / 3; /* 원하는 가로: 세로 비율을 지정 */ 
  border-radius: 15px;
`;

const SBox3 = styled.div`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #f0f0f0;
`;

// const InnerCircle = styled`
//   position: absolute;
//   width: 100%;
//   height: 100%;
// `

const Profile = () => {
  // const imagePath = "images/cat-551554_1280.jpg";

  return (
    <div>
      <SBox1>
        <SBox2>
          <SBox3/>
            {/* <InnerCircle></InnerCircle> */}
        </SBox2>
      </SBox1>
    </div>
  );
};

export { Profile };
