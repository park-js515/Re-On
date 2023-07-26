import styled from "styled-components";

const SInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: start;
`

const SImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 20px;
`
const SDiv = styled.div`
    display: flex;
`

const STitle = styled.span`
    font-size: 14px;
`
const SName = styled.span`
    font-size: 12px;
`

const SExtraInfo = styled.span`
    text-align: right;
`
const SLink = styled.a`
    text-decoration: none;
    color: black;
`
export {SInfo, SImg, SDiv, STitle, SName, SExtraInfo, SLink};