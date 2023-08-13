import React from 'react';
import { useLottie } from 'lottie-react';
import animationData from 'assets/animation/404.json';
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  const navigate = useNavigate();
  const { View } = useLottie(defaultOptions);

  const handleGoToMain = () => {
    Swal.fire({
      title: 'REON',
      text: '내가 데려다 줄까?',
      width: 600,
      padding: '3em',
      background: '#fff url(/images/trees.png)',
      backdrop: `
        rgba(102, 201, 143, 0.4)
        url("/images/nyan-cat.gif")
        left top
        no-repeat
      `,
      confirmButtonText: '응! ',
      cancelButtonText: '아냐, 괜찮아',
      showCancelButton: true,
      color: '#a3ddbb',
    }).then((result) => {
      if (result.isConfirmed) {
        navigate('/');
      }
    });
  };

  return (
    <div className="bg-gradient-to-t from-lightBlue to-begie flex items-center justify-center h-screen">
      <div className="flex flex-col items-center justify-center max-h-[400px] ">
        {View}
        <div className="mt-4 p-4">
          <button 
            onClick={handleGoToMain}
            className="px-10 py-4 bg-[#716add] text-[#fff] rounded text-2xl shadow-lg transform hover:scale-110  duration-200 hover:bg-[#7973d3] "
          >
            길을 잃었구나
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
