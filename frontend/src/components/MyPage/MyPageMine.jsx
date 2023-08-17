import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userLogout } from 'redux/userSlice';
import './MyPage.css'
import {
  searchMypageMemberInfo,
  updateMemberInfo,
  updateMemberImg,
  deleteMember,
  deleteMemberImg,
} from 'apiList/member';
import Swal from 'sweetalert2';

const useInputText = (initialValue, validator) => {
  const [text, setText] = useState(initialValue);

  const handleSetText = (event) => {
    if (event.target) {
      const {
        target: { value },
      } = event;
      let willUpdate = true;

      if (typeof validator === 'function') {
        willUpdate = validator(value);
      }

      if (willUpdate) {
        setText(value);
      }
    }
  };

  return [text, handleSetText, setText];
};

const alter_img_url = process.env.REACT_APP_ALTER_IMG_URL;
const MyPageMine = ({ setMyPage, email }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //페이지 유저 정보
  const [memberInfo, setMemberInfo] = useState({});
  // 자기소개
  const [introduce, setIntroduce, resetIntroduce] = useInputText(
    '',
    (value) => {
      return value.length <= 100;
    },
  );
  const [nickName, setNickName, resetNickName] = useInputText('', (value) => {
    return value.length < 16;
  });
  const [profileImage, setProfileImage] = useState(
    '/image/login/LoginDefaultImg.png',
  );

  // 내 페이지인지
  const [ismyPage, setIsmyPage] = useState(false);

  //새로 업로드할 사진
  const [selectedImageFile, setSelectedImageFile] = useState('');

  // 자기소개 수정 모달
  const [showModal, setShowModal] = useState(false);

  // 프로필 사진 수정 모달
  const [showProfileModal, setShowProfileModal] = useState(false);

  const getmemberInfo = async () => {
    await searchMypageMemberInfo(
      email,
      (response) => {
        console.log(response.data);
        setMemberInfo(response.data.response);
        resetIntroduce(response.data.response.introduce);
        resetNickName(response.data.response.nickName);
        setMyPage(response.data.response.isMyPage);
        if (response.data.response.profileImg != null) {
          setProfileImage(
            response.data.response.profileImg
              ? 'https://storage.googleapis.com/reon-bucket/' +
                  response.data.response.profileImg
              : alter_img_url,
          );
          // localStorage.setItem("profileImg",response.data.response.profileImg);
        } else {
          setProfileImage(alter_img_url);
          // localStorage.setItem("profileImg",null);
        }
        setIsmyPage(response.data.response.isMyPage);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  useEffect(() => {
    getmemberInfo();
  }, []);

  // 자기소개 수정하기
  const saveIntroduction = () => {
    if (nickName.length === 0) {
      Swal.fire({
        icon: 'info',
        title: '닉네임',
        text: '닉네임은 반드시 한 글자 이상이어야 합니다!.',
        backdrop: false,
      });
    } else {
      localStorage.setItem('nickName', nickName);
      updateMemberInfo(
        { introduce: introduce, nickName: nickName },
        () => {
          Swal.fire({
            icon: 'success',
            title: 'update',
            backdrop: false,
          });
          getmemberInfo();
        },
        (error) => {
          console.log(error);
        },
      );
      toggleModal(); // 모달을 닫습니다.
    }
  };
  // 회원 탈퇴하기
  const deleteUser = () => {
    Swal.fire({
      icon: 'warning',
      title: '회원탈퇴',
      text: '정말로 탈퇴하시겠습니까?',
      backdrop: false,

      showCancelButton: true,
      cancelButtonText: '취소',
      confirmButtonText: '예',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          icon: 'warning',
          title: '회원탈퇴',
          text: '탈퇴 후 모든 정보가 삭제됩니다.',
          backdrop: false,

          showCancelButton: true,
          cancelButtonText: '취소',
          confirmButtonText: '예',
        }).then((result) => {
          if (result.isConfirmed) {
            deleteMember(
              () => {
                Swal.fire({
                  icon: 'success',
                  title: '회원탈퇴 완료',
                  willClose: () => {
                    localStorage.clear();
                    window.location.replace('/');
                  },
                });
              },
              (error) => {
                console.log(error);
              },
            );
          }
        });
      }
    });
  };

  //프로필 수정 모달 열기
  const toggleModal = () => {
    if (showModal) {
      resetNickName(memberInfo.nickName);
      resetIntroduce(memberInfo.introduce);
    }
    setShowModal(!showModal);
  };
  //프로필 사진수정 모달
  const toggleProfileModal = () => {
    if (showProfileModal) {
      setSelectedImageFile('');
    }
    setShowProfileModal(!showProfileModal);
  };

  //FileReader 이거 좋타던데 ?
  const handleImageChange = (e) => {
    if (e.target.files) {
      // const reader = new FileReader();
      const file = e.target.files[0];
      // reader.onload = function(event) {
      //   setSelectedImage(event.target.result);
      // };
      setSelectedImageFile(file);
      // reader.readAsDataURL(file);
    }
  };

  // profileImg 변경
  const saveProfileImage = () => {
    if (selectedImageFile === null || selectedImageFile === '') {
      // alert("이미지를 업로드해주세요");
      Swal.fire({
        icon: 'info',
        title: '프로필 이미지',
        text: '선택된 이미지가 없습니다! 이미지를 선택하세요.',
        backdrop: false,
      });
    } else {
      const formData = new FormData();
      formData.append('profileImg', selectedImageFile);

      updateMemberImg(
        formData,
        (response) => {
          if (response.data.success) {
            searchMypageMemberInfo(
              email,
              (response) => {
                const url = response.data.response.profileImg;
                if (url) {
                  localStorage.setItem('profileImg', url);
                } else {
                  localStorage.setItem('profileImg', alter_img_url);
                }
                window.location.reload();
              },
              (error) => {
                console.log(error);
              },
            );
            getmemberInfo();
            setShowProfileModal(false);
          } else {
            Swal.fire({
              icon: 'warning',
              title: '업데이트 실패',
              text: '유저 업데이트가 실패했습니다. 다시 시도해주세요.',
              backdrop: false,
            });
          }
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const deleteUserImage = () => {
    deleteMemberImg(
      () => {
        localStorage.setItem('profileImg', '');
        getmemberInfo();
        setShowProfileModal(false);
        window.location.reload();
      },
      (error) => {
        console.log(error);
      },
    );
  };
  const getRankColorValue = (tier) => {
    switch (tier) {
      case 'GOLD':
        return '#ffd700'; 
      case 'SILVER':
        return '#c0c0c0'; 
      case 'BRONZE':
        return '#cd7f32'; 
      default:
        return 'inherit'; 
    }
  };


  return (
    <div className="animate-slideInFromTop pt-12 flex items-start py-16 px-16 shadow-2xl rounded-xl bg-gradient-to-tl from-begie to-lightBlue ">
      
      <img
        className="rounded-full w-[200px] h-[200px] object-cover mr-4 shadow-lg transition-all duration-300 ease-in-out hover:opacity-50 hover:blur-s cursor-pointer"
        src={profileImage}
        alt={memberInfo.name}
        onClick={ismyPage ? toggleProfileModal : undefined}
      />

      <div className="border-r-2 border-[#666] self-stretch ml-6"></div>

      {/* 프로필 정보 */}
      <div className="flex flex-col justify-start flex-grow">
        <div className="flex items-center justify-between w-full ml-12">
          <h1 className="text-2xl font-bold text-dark">{memberInfo.nickName}</h1>
          <h1 className="ml-4 flex flex-grow text-2xl font-bold" style={{color: getRankColorValue(memberInfo.tier)}}>{memberInfo.tier}</h1>
          {ismyPage && (
            <button
              className="rounded bg-[#f3f0e4] text-lg hover:scale-105 px-6 py-2 transition-all duration-300 ease-in-out"
              onClick={toggleModal}
            >
              수정
            </button>
          )}
        </div>

        {/* 닉,소개 */}
        <div className="mt-2 ml-12 text-dark">
          <div className="mt-1 flex flex-col font-mono text-md text-[#3c2c2c] justify-start flex-grow">
            {memberInfo.email}
          </div>
          <h3 className="mt-4 text-xl text-[#2a2424]">{memberInfo.introduce}</h3>
        </div>
      </div>

      {/* 여기 아래 부터 모달들 */}

      {/* 자기소개, 닉네임 수정*/}
        {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity">
            <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 rounded-lg shadow-2xl relative">
                {/* 닫기 버튼 */}
                <span className="absolute top-4 right-4 cursor-pointer text-2xl hover:text-gray" onClick={toggleModal}>
                    ✖
                </span>

                <h2 className="text-2xl mb-6 border-b pb-2">프로필 수정</h2>
                
                <div className="mt-4">
                    <label className="block text-lg mb-2">닉네임</label>
                    <input
                        value={nickName}
                        onChange={setNickName}
                        className="w-full p-3 border-2 rounded-lg focus:border-lightBlue focus:outline-none transition-colors"
                    />
                </div>

                <div className="mt-6">
                    <label className="block text-lg mb-2">자기소개</label>
                    <textarea
                        value={introduce ? introduce : ' '}
                        onChange={setIntroduce}
                        rows="4"
                        className="w-full p-3 border-2 rounded-lg focus:border-lightBlue focus:outline-none transition-colors"
                    />
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="mr-2 px-6 py-2 rounded-full bg-lightBlue hover:scale-105 text-white transition-colors"
                        onClick={saveIntroduction}
                    >
                        저장
                    </button>
                    <button
                        className="px-6 py-2 rounded-full bg-danger hover:scale-105  text-white transition-colors"
                        onClick={deleteUser}
                    >
                        탈퇴
                    </button>
                </div>
            </div>
        </div>
      )}
      {/* 프로필사진변경 */}
      {showProfileModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-60 z-50 transition-opacity">
            <div className="bg-white w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 p-6 rounded-lg shadow-2xl relative">
                {/* 닫기 버튼 위치와 디자인 개선 */}
                <span className="absolute top-4 right-4 cursor-pointer text-2xl hover:text-gray-600" onClick={toggleProfileModal}>
                    ✖
                </span>

                <h2 className="text-2xl font-bold mb-6 border-b pb-2">프로필 사진 변경</h2>
                
                <div className="mt-4 relative">
                    <input 
                        type="file" 
                        onChange={handleImageChange} 
                        className="w-full p-3 border-2 rounded-lg focus:border-lightBlue focus:outline-none transition-colors opacity-0 absolute inset-0 cursor-pointer"
                        id="fileInput"
                    />
                    <div className="w-full p-3 border-2 rounded-lg border-dashed text-center">
                        {document.getElementById("fileInput") && document.getElementById("fileInput").files[0] ? document.getElementById("fileInput").files[0].name : "파일을 선택하거나 드래그 앤 드롭하세요"}
                    </div>
                </div>

                <div className="flex justify-end mt-6">
                    <button
                        className="mr-2 px-6 py-2 rounded-full bg-lightBlue hover:scale-105  text-white transition-colors"
                        onClick={saveProfileImage}
                    >
                        저장
                    </button>
                    <button
                        className="px-6 py-2 rounded-full bg-danger hover:scale-105  text-white transition-colors"
                        onClick={deleteUserImage}
                    >
                        삭제
                    </button>
                </div>
            </div>
        </div>
       )}

    </div>
  );
};
export default MyPageMine;
