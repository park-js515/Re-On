import React, { useState } from 'react';

export default function MyPageMine() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const DummyData = {
    name: '종상시치',
    image: 'https://source.unsplash.com/random?sig=169',
    postCount: 10,
    introduction: '안녕하세요, 종상시치입니다.',
  };

  return (
    <div className="my-4 py-4 flex items-start">
      <img
        className="rounded-full w-[200px] h-[200px] object-cover mr-4"
        src={DummyData.image}
        alt={DummyData.name}
      />
      <div className="flex flex-col justify-start flex-grow">
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-bold">{DummyData.name}</h1>
          <button
            id="modify"
            className="rounded bg-[#f2ecda] text-[15px] px-4 py-1 hover:bg-[#f2ecda]"
            onClick={toggleModal}
          >
            수정
          </button>
        </div>
        <h3 className="text-sm text-gray-600 mt-2">게시물: {DummyData.postCount}</h3>
        <div className="mt-2">
          <h3 className="text-sm text-gray-500">{DummyData.introduction}</h3>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-lg shadow-lg relative">
            <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={toggleModal}>×</span>
            <h2 className="text-2xl font-bold mb-4">모달 제목</h2>
            <p>희창이 이스터에그</p>
            {/* 필요한 경우 추가적인 버튼 또는 폼 요소를 여기에 추가할 수 있습니다. */}
          </div>
        </div>
      )}
    </div>
  );
}
