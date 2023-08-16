import React from 'react';
import { useNavigate } from 'react-router-dom';
import Commentlist from './Commentlist';
import { useState, useEffect } from 'react';
import {
  searchPublicPostDetail,
  likePost,
  updatePost,
  pullDownPublicPost,
  searchPrivatePostDetail,
  uploadPrivatePost,
} from 'apiList/post';
import Swal from 'sweetalert2';

const alter_img_url = process.env.REACT_APP_ALTER_IMG_URL;

const Videoplayer = ({ post_id, changeShow, isPrivate }) => {
  let ignore = false;

  const [data, setData] = useState([]);
  const [edit, setEdit] = useState(isPrivate);
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');

  const MAX_LENGTH = 255; // 제목, 내용 최대 글자 수

  useEffect(() => {
    if (!ignore) {
      if (isPrivate) {
        searchPrivatePostDetail(
          post_id,
          (response) => {
            const newdata = response.data.response;
            setData(newdata);
            console.log(newdata);
          },
          (error) => {
            console.log(error);
          },
        );
      } else {
        searchPublicPostDetail(
          post_id,
          (response) => {
            const newdata = response.data.response;
            setData(newdata);
            setTitle(newdata.title);
            setContent(newdata.content);
            console.log(newdata);
          },
          (error) => {
            console.log(error);
          },
        );
      }
    }
    return () => {
      ignore = true;
    };
  }, []);

  const moveToMyPage = () => {
    window.location.assign('/mypage/' + data.email);
  };

  const likeVideo = (event) => {
    event.preventDefault();
    likePost(
      post_id,
      (response) => {
        let temp = { ...data };
        if (temp.isLike) {
          temp.likeCnt--;
        } else {
          temp.likeCnt++;
        }
        temp.isLike = !temp.isLike;
        setData({ ...temp });
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const convertToK = (number) => {
    if (number >= 1000) {
      const front = Math.floor(number / 1000);
      const back = Math.floor(Math.floor(number % 1000) / 100);
      return front + '.' + back + 'k';
    } else {
      return number;
    }
  };
  const deletePost = () => {
    Swal.fire({
      showCancelButton: true,
      text: '게시글을 비공개로 전환하시겠습니까?',
      confirmButtonText: 'YES',
      cancelButtonText: 'NO',
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        pullDownPublicPost(
          post_id,
          (response) => {
            changeShow();
          },
          (error) => {
            console.log(error);
          },
        );
      }
    });
  };

  const editPost = () => {
    if (edit) {
      if (title.trim() === '' || content.trim() === '') {
        Swal.fire({
          icon: 'info',
          text: '입력 후에 수정해주세요.',
          backdrop: false,
        });
        setTitle(data.title);
        setContent(data.content);
      } else {
        updatePost(
          post_id,
          { title: title, content: content },
          (response) => {},
          (error) => {
            console.log(error);
          },
        );
      }
    }
    setEdit((edit) => {
      return !edit;
    });
  };
  const changeContent = (event) => {
    if (event.target.value.length > 255) {
      Swal.fire({
        icon: 'info',
        text: '255자 이내로 작성해주세요.',
        backdrop: false,
      });
    } else {
      setContent(event.target.value);
    }
  };
  const changeTitle = (event) => {
    if (event.target.value.length > 30) {
      Swal.fire({
        icon: 'info',
        text: '30자 이내로 작성해주세요.',
        backdrop: false,
      });
    } else {
      setTitle(event.target.value);
    }
  };
  const postPost = () => {
    if (title.trim() === '' || content.trim() === '') {
      Swal.fire({
        icon: 'info',
        text: '1자 이상 작성해주세요.',
        backdrop: false,
      });
      return;
    }

    Swal.fire({
      showCancelButton: true,
      text: '업로드 하시겠습니까?',
      confirmButtonText: '예',
      cancelButtonText: '취소',
      backdrop: false,
    }).then((result) => {
      if (result.isConfirmed) {
        uploadPrivatePost(
          post_id,
          { title: title, content: content },
          (response) => {
            Swal.fire({
              icon: 'success',
              html: '업로드가 완료되었습니다. <br /> 게시글에 가면 시청 가능합니다.',
              backdrop: false,
            });
            changeShow();
          },
          (error) => {
            console.log(error);
          },
        );
      }
    });
  };
  
  return (
    <div
      className="fixed top-6 z-40 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
      onClick={() => {
        changeShow();
      }}
    >
      <div
        className="flex w-8/12 h-[80vh] max-h-[80vh] bg-white p-6 rounded-xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 왼쪽 섹션 */}
        <div className={`${isPrivate ? "w-full" : "w-8/12"} pr-4 border-r border-gray overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide`}>
          {/* 비디오 */}
          <video
            className="w-full h-5/6 rounded-md shadow-sm mb-4"
            controls
            controlsList={isPrivate ? 'download' : 'nodownload'}
            src={data.actionPath ? 'https://storage.googleapis.com/reon-bucket/' + data.actionPath : null}
          ></video>
  
          {/* 작성자 정보 */}
          <div className="my-4 rounded-xl ">
            {/* 제목 */}
          
            <textarea
              rows="2"
              value={title}
              className={`resize-none text-3xl font-bold my-3 border-b w-full bg-white ${
                edit ? 'outline-none border-blue shadow-lg' : ''
              }`}
              onChange={changeTitle}
              disabled={!edit}
              placeholder={isPrivate ? '제목을 입력해주세요 (1자 이상)' : null}
            ></textarea>
       
            {/* 프로필, 이름 및 버튼들 */}
            <div className="flex items-center space-x-4">
              {!isPrivate ? (
                <>
                  <img
                    className="rounded-full w-[80px] h-[80px] shadow-md cursor-pointer"
                    src={data.profileImg ? 'https://storage.googleapis.com/reon-bucket/' + data.profileImg : alter_img_url}
                    alt=""
                    onClick={() => {
                      changeShow();
                      moveToMyPage();
                    }}
                  />
                  <h2 className="flex-grow text-xl font-semibold truncate cursor-pointer" onClick={moveToMyPage}>
                    {data.nickName}
                  </h2>
                  <button
                    className={`px-4 py-2 rounded-md font-semibold text-xl ${
                      data.isLike ? 'hover:scale-110' : 'hover:scale-110'
                    }`}
                    onClick={likeVideo}
                  >
                    {data.isLike ? '❤️' : '🖤'} {convertToK(data.likeCnt)}
                  </button>
                </>
              ) : (
                <>
                <div className="flex-grow"></div> 
                <button className="px-4 py-2 rounded-md bg-blue hover:bg-[#649dcc] text-white" onClick={postPost}>
                  업로드
                </button>
                </>
              )}
              
              {data.isMyPost && (
                <div className="flex space-x-4 ">
                  <button className="hover:scale-110 text-black font-semibold  px-4 py-2 rounded-md" onClick={editPost}>
                    🔨수정
                  </button>
                  <button className="hover:scale-110 text-black font-semibold  px-4 py-2 rounded-md" onClick={deletePost}>
                    🗑️삭제
                  </button>
                </div>
              )}
            </div>
          </div>
  
          {/* 내용 */}
          <textarea
            value={content}
            className={`w-full p-3 resize-none rounded-md bg-white border ${edit ? 'border-blue rounded-md border shadow-lg' : ''}`}
            disabled={!edit}
            onChange={changeContent}
            placeholder={isPrivate ? '설명을 입력해주세요 (1자 이상)' : null}
          ></textarea>
        </div>
  
        {/* 오른쪽 섹션 */}
        
        {!isPrivate && (
          
          <div className="w-4/12 pl-4 overflow-y-auto max-h-[calc(80vh-48px)] scrollbar-hide">
            {data.postCommentResponses && (
              <Commentlist post_id={data.id} changeShow={changeShow} initialData={data.postCommentResponses} />
            )}
          </div>
        )}
      </div>
    </div>
  );
  
  
};

export default Videoplayer;
