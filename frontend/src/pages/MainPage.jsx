import Banner from "../components/home/Banner";
import HomePage from "../components/home/HomePage";
import { Container } from "@mui/system";

function Home() {

  return (
    <div>
     
      <Banner />
     
      <Container maxidth="lg">
        <HomePage />
      </Container>
     
    </div>
  );
}

export default Home;
