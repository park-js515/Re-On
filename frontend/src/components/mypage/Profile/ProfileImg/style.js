import styled from "styled-components";

const SImg = styled.img`
  box-sizing: border-box;
`;

const SImgProfile = styled(SImg)`
  height: 95%;
  aspect-ratio: 1;
  border-radius: 100%;
`;

const SImgTier = styled(SImg)`
  height: 60%;
`;

export { SImgProfile, SImgTier};
