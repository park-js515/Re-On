import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from 'redux/userSlice';

import axios from 'axios';
import { searchMypageMemberInfo, updateMemberInfo, updateMemberImg, deleteMember, deleteMemberImg } from 'apiList/member';

const MyPageMine = ({setMyPage, email}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //페이지 유저 정보
  const [memberInfo, setMemberInfo] = useState({});
  // 자기소개
  const [introduce, setIntroduce] = useState("");
  const [nickName, setNickName] = useState("");
  const [profileImage, setProfileImage] = useState('/image/login/LoginDefaultImg.png');

  // 내 페이지인지
  const [ismyPage, setIsmyPage] = useState(false);

  //새로 업로드할 사진
  const [selectedImageFile, setSelectedImageFile] = useState(null);

  // 자기소개 수정 모달
  const [showModal, setShowModal] = useState(false);
  // 프로필 사진 수정 모달
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getmemberInfo = async() => {
    await searchMypageMemberInfo(email, (response) => {
      console.log(response.data.response);
      setMemberInfo(response.data.response)
      setIntroduce(response.data.response.introduce)
      setNickName(response.data.response.nickName)
      setMyPage(response.data.response.isMyPage);
      if(response.data.response.profileImg!=null){
        setProfileImage("https://storage.googleapis.com/reon-bucket/" + response.data.response.profileImg);
        localStorage.setItem("profileImg",response.data.response.profileImg);
      }else{
        setProfileImage('/image/login/LoginDefaultImg.png');
        localStorage.setItem("profileImg",null);
      }
      setIsmyPage(response.data.response.isMyPage);
    }, (error) => {
      console.log(error);
    })
  }


  useEffect(() => {
    getmemberInfo();
  },[]);



  // 자기소개 수정하기
  const saveIntroduction = () => {
    updateMemberInfo({ introduce: introduce, nickName: memberInfo.nickName }, () => {
      alert("수정이 완료되었습니다");
      getmemberInfo();
    }, (error) => {
      console.log(error);
    })
    toggleModal(); // 모달을 닫습니다.
  };
  // 회원 탈퇴하기
  const deleteUser = () => {
    if(window.confirm("정말 탈퇴하시겠습니까?")){
      if(window.confirm("탈퇴 후에 모든 정보가 삭제됩니다.")){
        deleteMember(() => {
          alert("회원 탈퇴가 완료되었습니다.");
          localStorage.clear();
          dispatch(userLogout());
          navigate("/");
        }, (error) => {
          console.log(error);
        })
      }
    }
    toggleModal(); // 모달을 닫습니다.
  };


  //프로필 수정 모달 열기
  const toggleModal = () => {
    if (showModal) {
      setNickName(memberInfo.nickName);
      setIntroduce(memberInfo.introduce);
    }
    setShowModal(!showModal);
  };
  //프로필 사진수정 모달
  const toggleProfileModal = () => {
    if (showProfileModal) {
      setSelectedImageFile(null);
    }
    setShowProfileModal(!showProfileModal);
  };

  
  //FileReader 이거 좋타던데 ?
  const handleImageChange = (e) => {
    if (e.target.files) {
      // const reader = new FileReader();
      const file = e.target.files[0];
      console.log(file);
      // reader.onload = function(event) {
      //   setSelectedImage(event.target.result);
      // };
      setSelectedImageFile(file);  
      // reader.readAsDataURL(file);
    }
  };
  
  // profileImg 변경
  const saveProfileImage = () => {
    
    console.log(selectedImageFile);

    if (selectedImageFile==null){
      alert("이미지를 업로드해주세요");
    }
    else{
      const formData = new FormData();
      formData.append('profileImg', selectedImageFile);

      updateMemberImg(formData,(response) => {
        if (response.data.success) {
          getmemberInfo();
          setShowProfileModal(false);
        } else {
          alert('안되노.');
        }
      },(error) => {
        console.log(error);
      })
  }
  };

  const deleteUserImage = ()=>{
    deleteMemberImg(()=>{
      getmemberInfo();
      setShowProfileModal(false);
    },(error)=>{
      console.log(error);
    })
  }



  return (
    <div className="pt-12 flex items-start">
      
      {/* 프로필사진 */}
      {ismyPage &&
        <img
          className="rounded-full w-[200px] h-[200px] object-cover mr-4 hover:opacity-70 hover:blur-s cursor-pointer"
          src={profileImage}
          alt={memberInfo.name}
          onClick={toggleProfileModal}
        />}
      {!ismyPage &&
        <img
          className="rounded-full w-[200px] h-[200px] object-cover mr-4 hover:opacity-70 hover:blur-s cursor-pointer"
          src={profileImage}
          alt={memberInfo.name}
        />}
      {/* 프로필수정 */}
      <div className="flex flex-col justify-start flex-grow">
        <div className="flex items-center justify-between w-full ml-12">
          <h1 className="text-2xl font-bold">{memberInfo.nickName}</h1>
          {/* 티어 */}
          <div className="flex flex-col justify-start flex-grow">{memberInfo.tier}</div>
          {ismyPage &&<button className="rounded bg-[#dfe0e2] text-lg hover:bg-[#9fa3a3] font-semibold px-6 py-2"
            onClick={toggleModal}>
            수정
          </button>}
          
        </div>
        {/* 이메일 */}


        {/* 게시물수 및 내용 */}
        <div className="mt-2 ml-12">
          <div className="flex flex-col justify-start flex-grow">{memberInfo.email}</div>
          <h3 className="text-lg text-gray-500">{memberInfo.introduce}</h3>
        </div>
      </div>

      {/* 여기 아래 부터 모달들 */}

      {/* 자기소개, 닉네임 수정*/}
      {showModal && (
      <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50"> 
        <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4 rounded-lg shadow-lg relative">
          <span className="absolute top-2 right-2 cursor-pointer text-xl" onClick={toggleModal}>✖</span>
          <h2 className="text-2xl font-bold mb-4">프로필 수정</h2>
          <label>닉네임:</label>
          <textarea
            value={nickName}
            onChange={(e) => setNickName(e.target.value)}
            rows="4"
            className="w-full p-2 mt-2 border rounded"
            />
            <label>자기소개:</label>
          <textarea
            value={introduce}
            onChange={(e) => setIntroduce(e.target.value)}
            rows="4"
            className="w-full p-2 mt-2 border rounded"
          />
          <button className="mt-4 px-6 py-2 rounded bg-lightBlue text-black" onClick={saveIntroduction}>저장</button>
          <button className="mt-4 px-6 py-2 rounded bg-danger text-black" onClick={deleteUser}>탈퇴</button>
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
            <div>
                <button className="mt-4 px-6 py-2 rounded bg-lightBlue text-black" onClick={saveProfileImage}>저장</button>
                <button className="mt-4 px-6 py-2 rounded bg-danger text-black" onClick={deleteUserImage}>삭제</button>
              </div>
                </div>
              </div>
            )
          }
    </div>
  );
}
export default MyPageMine;