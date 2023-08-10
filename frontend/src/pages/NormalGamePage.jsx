import { Container } from '@mui/system';
import Postbar from "components/My/Postbar"
import MyPageMine from "components/My/MyPageMine"


const NoramalGamePage = () => {
  return(
    <div className="bg-gradient-to-t from-lightBlue to-begie">

    <Container >
      <div >
        <MyPageMine/>
      </div>
    </Container>
      <div>

        <Postbar/>
      </div>
    </div>
  )

};

export default NoramalGamePage;

