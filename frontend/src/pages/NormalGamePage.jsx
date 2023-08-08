import { Container } from '@mui/system';
import Postbar from "components/My/Postbar"
import MyPageMine from "components/My/MyPageMine"


const NoramalGamePage = () => {
  return(
    <div>

    <Container>
    <div className='border-b'>
      <MyPageMine/>
    </div>
    </Container>
      <Postbar/>
    </div>
  )

};

export default NoramalGamePage;

