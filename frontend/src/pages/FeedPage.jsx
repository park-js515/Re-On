import Hotlist from "components/VideoComponent/Hotlist";
import Videolist from "components/VideoComponent/Videolist";

const FeedPage = () => {

  return (

   
    <div className="bg-gradient-to-t from-lightBlue via-begie to-begie" >
       
      <Hotlist/>
    
      <Videolist
        type={"AllPublic"}
      />
      
    </div>
  );
};

export default FeedPage;
