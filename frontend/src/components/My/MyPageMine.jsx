export default function MyPageMine({clickModal}) {
  const DummyData = {
    name: '종상시치',
    image: 'https://source.unsplash.com/random?sig=169',
  };

  
  return (
    <div className="w-[336px] my-4 py-4 ">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <img
          className="rounded-full  w-[150px] h-[150px]"
          src={DummyData.image}
        />

        <p className="text-[18px] font-bold text-center text-black mt-2">{DummyData.name}</p>
        
        <button
          id="modify"
          className="w-[90%] rounded-[20px] bg-[#f2ecda] text-[15px] text-center text-f2ecda py-1 hover:bg-[#f2ecda]"
          onClick={clickModal}
        >
          프로필 수정하기
        </button>
      </div>
      
    </div>
  );
}
