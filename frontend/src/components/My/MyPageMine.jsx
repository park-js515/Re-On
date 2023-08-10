import React, { useState } from 'react';

export default function MyPageMine() {
  const [showModal, setShowModal] = useState(false);

  const [showProfileModal, setShowProfileModal] = useState(false);

  //프로핑 수정
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  //프로필 사진수정
  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
  
      reader.onload = function(event) {
        // 여기서 API 호출을 통해 서버에 이미지를 업로드하거나 다른 처리
        
      };
  
      reader.readAsDataURL(e.target.files[0]);
    }
  };
  
  const saveProfileImage = () => {
    // 여기서 프로필 이미지 변경을 처리 서버에 변경된 이미지를 저장합니다.
    // 변경이 완료되면, setShowProfileModal(false); 를 호출하여 모달을 닫습니다.
  };
  
  const DummyData = {
    name: '종상시치',
    image: 'https://source.unsplash.com/random?sig=169',
    postCount: 10,
    introduction: '안녕하세요, 종상시치입니다.',
  };

  return (
    <div className="pt-12 flex items-start">
      <img
        className="rounded-full w-[200px] h-[200px] object-cover mr-4 hover:opacity-70 hover:blur-s cursor-pointer"
        src={DummyData.image}
        alt={DummyData.name}
        onClick={toggleProfileModal}
      />
      <div className="flex flex-col justify-start flex-grow">
        <div className="flex items-center justify-between w-full ml-12">
          <h1 className="text-2xl font-bold">{DummyData.name}</h1>
          <button
            id="modify"
            className="rounded bg-[#dfe0e2] text-lg hover:bg-[#9fa3a3] font-semibold px-6 py-2"
            onClick={toggleModal}
          >
            수정
          </button>
        </div>
        <div className="mt-2 ml-12">
          <h3 className="text-lg text-gray-600 mt-2">게시물: {DummyData.postCount}</h3>
          <h3 className="text-lg text-gray-500">{DummyData.introduction}</h3>
        </div>
      </div>

      {/* 여기 아래 부터 모달들 */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"> 
          <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-lg shadow-lg relative">
            <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={toggleModal}>✖</span>
            <h2 className="text-2xl font-bold mb-4">프로필 수정</h2>
            <p>희창이 이스터에그</p>
          </div>
        </div>
      )}

      {showProfileModal && (
              <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"> 
                <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-lg shadow-lg relative">
                  <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={toggleProfileModal}>✖</span>
                  <h2 className="text-2xl font-bold mb-4">프로필 사진 변경</h2>
                  <input type="file" onChange={handleImageChange} />
                  <button className="mt-4 px-6 py-2 rounded bg-blue-500 text-white" onClick={saveProfileImage}>저장</button>
                </div>
              </div>
            )
          }

    </div>
  );
}
