import { Container } from '@mui/system';
import Postbar from "components/MyPage/Postbar"
import MyPageMine from "components/MyPage/MyPageMine"


const MyPage = () => {
  return(
    <div className="bg-gradient-to-t from-lightBlue to-begie">

    <Container >
      <div >
        <MyPageMine/>
      </div>
    </Container>
      

        <Postbar/>
     
    </div>
  )

};

export default MyPage;

