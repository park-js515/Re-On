import ImageCarousel from "../components/Login/ImageCarousel.jsx"
import "../components/Login/ImageCarousel.css"
import NotLogin from "../components/Login/NotLogin"

const LoginPage = () => {
  return (
    <div className=" w-full h-screen grid-carousel bg-gradient-to-tl from-begie to-lightBlue flex justify-center items-center  ">
    <div className=" flex  w-4/5 bg-white h-4/5  max-w-[1000px] min-w-[700px] rounded-2xl p-4 pb-0 shadow-xl ">
      <div className="w-1/2 h-full  rounded-2xl mt-5 ">
        <ImageCarousel />
      </div>
      <div className="w-1/2  h-full  p-4 flex justify-center items-center flex-col relative">
        <img src='/image/logo/logo.png' style={{ height: "100px" }} alt="" />
        {<NotLogin />}
      </div>
    </div>
  </div>
  )

};

export default LoginPage;
