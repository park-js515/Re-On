import { Container } from '@mui/system';
import Postbar from "components/MyPage/Postbar"
import MyPageMine from "components/MyPage/MyPageMine"
import { useState } from 'react';
import { useParams } from 'react-router-dom';
const MyPage = () => {
    //내 페이지인지
  const [myPage, setMyPage] = useState(false);
  const { email } = useParams();
  
  return(
    <div className="bg-gradient-to-t from-lightBlue to-begie">

    <Container >
      <div >
        <MyPageMine setMyPage={setMyPage} email={email}/>
      </div>
    </Container>
      
      <Postbar myPage={myPage} email={email} />
     
    </div>
  )

};

export default MyPage;

