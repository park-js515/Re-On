import React, { useState } from 'react';
import axios from 'axios';

const MyPageMine = () => {


  // 더미
  const DummyData = {
    name: '종상시치',
    image: 'https://source.unsplash.com/random?sig=169',

    introduction: '안녕하세요, 종상시치입니다.',
  };

  // 모달
  const [showModal, setShowModal] = useState(false);
  // 프로필사진
  const [showProfileModal, setShowProfileModal] = useState(false);
  // 자기소개
  const [introduction, setIntroduction] = useState(DummyData.introduction);

  const [selectedImageFile, setSelectedImageFile] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  // 자기소개 수정함수
  const saveIntroduction = () => {
   
    setIntroduction(introduction);
    toggleModal(); // 모달을 닫습니다.
  };

  //프로핑 내용 수정
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //프로필 사진수정
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  

  //FileReader 이거 좋타던데 ?
  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      const file = e.target.files[0];

      reader.onload = function(event) {
        setSelectedImage(event.target.result);
      };
      
      setSelectedImageFile(file);  
      reader.readAsDataURL(file);
    }
  };
  
  
  // profileImg 변경 테스트 임 수정할거
  const saveProfileImage = () => {
    if (!selectedImageFile) return;

    const formData = new FormData();
    formData.append('profileImg', selectedImageFile);

    axios.put('https://i9c203.p.ssafy.io/api/member-management/images/update', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      if (response.data.success) {
        setShowProfileModal(false);
      } else {
        alert('안되노.');
      }
    })
    .catch(error => {
      console.error("뭐라노", error.response.data);
    });
  };


  

  return (
    <div className="pt-12 flex items-start">
      {/* 프로필사진 */}
      <img
        className="rounded-full w-[200px] h-[200px] object-cover mr-4 hover:opacity-70 hover:blur-s cursor-pointer"
        src={DummyData.image}
        alt={DummyData.name}
        onClick={toggleProfileModal}
      />
      {/* 프로필수정 */}
      <div className="flex flex-col justify-start flex-grow">
        <div className="flex items-center justify-between w-full ml-12">
          <h1 className="text-2xl font-bold">{DummyData.name}</h1>
          <button className="rounded bg-[#dfe0e2] text-lg hover:bg-[#9fa3a3] font-semibold px-6 py-2"
            onClick={toggleModal}>
            수정
          </button>
        </div>
        {/* 게시물수 및 내용 */}
        <div className="mt-2 ml-12">
    
          <h3 className="text-lg text-gray-500">{introduction}</h3>
        </div>
      </div>

      {/* 여기 아래 부터 모달들 */}
      {/* 프로필수정 */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"> 
          <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-lg shadow-lg relative">
            <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={toggleModal}>✖</span>
            <h2 className="text-2xl font-bold mb-4">프로필 수정</h2>
            <p>희창이 이스터에그</p>
          </div>
        </div>
      )}

      {/* 자기소개 수정 */}
      {showModal && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"> 
        <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-lg shadow-lg relative">
          <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={toggleModal}>✖</span>
          <h2 className="text-2xl font-bold mb-4">프로필 수정</h2>
          <label>자기소개:</label>
          <textarea
            value={introduction}
            onChange={(e) => setIntroduction(e.target.value)}
            rows="4"
            className="w-full p-2 mt-2 border rounded"
          />
          <button className="mt-4 px-6 py-2 rounded bg-lightBlue text-black" onClick={saveIntroduction}>저장</button>
        </div>
      </div>
    )}

      {/* 프로필사진변경 */}
      {showProfileModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"> 
                <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-lg shadow-lg relative">
                  <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={toggleProfileModal}>✖</span>
                  <h2 className="text-2xl font-bold mb-4">프로필 사진 변경</h2>
                  <input type="file" onChange={handleImageChange} />
                  <button className="mt-4 px-6 py-2 rounded bg-lightBlue text-black" onClick={saveProfileImage}>저장</button>
                </div>
              </div>
            )
          }

    </div>
  );
}
export default MyPageMine;