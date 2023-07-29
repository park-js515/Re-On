import styled from "styled-components";

const SCam = styled.div`
  width: 200px;
  height: 200px;
  background-color: black;
  border: black 1px solid;
`;

const UserCam = ({ onClick }) => {
  return (
    <div>
      유저캠
      <SCam />
      <button onClick={onClick}>Click me</button>
    </div>
  );
};

export default UserCam;
