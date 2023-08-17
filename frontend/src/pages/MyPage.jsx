import { Container } from '@mui/system';
import Postbar from "components/MyPage/Postbar"
import MyPageMine from "components/MyPage/MyPageMine"
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import ImageCarousel from "../components/login/ImageCarousel.jsx"
import "../components/login/ImageCarousel.css"
const MyPage = () => {
    //내 페이지인지
  const [myPage, setMyPage] = useState(false);
  const { email } = useParams();
  return (
    <div className='pt-8'>
      
        <div className="absolute top-0 left-0 w-full z--1 h-full z-0 grid-carousel bg-white">
            <ImageCarousel/>
        </div>
        
     
        <div className="relative">
            <Container>
                <div>
                    <MyPageMine setMyPage={setMyPage} email={email}/>
                </div>
            </Container>
        </div>

        <div className="relative">
            <Postbar myPage={myPage} email={email}/>
        </div>
    </div>
)

};

export default MyPage;

