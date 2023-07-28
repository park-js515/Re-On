import styled from "styled-components";

const SDiv = styled.div`
  box-sizing: border-box;
`;

const SText = styled(SDiv)`
  white-space: pre-line;
  font-size: 16px;
  color: white;
  line-height: 1.5;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  word-wrap: break-word;
`;

const SInfoDetail = styled(SDiv)`
  font-size: 16px;
  color: white;
  line-height: 1.5;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const SNickname = styled.h2`
  text-align: center;
  color: white;
	
`;

const SImg = styled.img`
  box-sizing: border-box;
`;

const SImgInfo = styled(SImg)`
  height: 5vh;
  aspect-ratio: 1;
`;

const SImgModify = styled(SImgInfo)`
	cursor: pointer;
`

export { SText, SInfoDetail, SNickname, SImgInfo, SImgModify };
