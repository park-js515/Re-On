import React from 'react';
import Comment from './Comment';
import { useState } from 'react';
import {
  searchPostDetailComment,
  createPostComment,
  deletePostComment,
} from 'apiList/post';

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

const Commentlist = ({ post_id, changeShow, initialData }) => {
  let page = 2;
  let maxLength = 100;

  // 댓글은 게시글 식별자로 조회
  const [comments, setComments] = useState(initialData); // 초기 댓글 (VideoPlayer에서 받아온거)
  const [userInput, setUserInput, resetUserInput] = useInputText(
    '',
    (value) => {
      return value.length <= maxLength;
    },
  ); // 댓글 쓰기 창 (최대 150자: maxLength로 조절)
  const [more, setMore] = useState(initialData.length > 10 ? true : false); // 댓글 더보기 가능 여부

  const onChange = (event) => {
    setUserInput(event);
  };

  const getComment = () => {
    if (more) {
      searchPostDetailComment(
        post_id,
        page,
        (response) => {
          const newData = response.data.response;
          setComments((comments) => {
            return [...comments, ...newData];
          });
          page++;
          if (newData.length < 10) {
            setMore(false);
          }
        },
        (error) => {
          console.log(error);
        },
      );
    }
  };

  const addComment = () => {
    if (userInput.trim().length < 1) {
      Swal.fire({
        icon: 'info',
        text: '댓글 작성 후 눌러주세요.',
        backdrop: false,
      });
      return;
    } else {
      // axios로 API 서버에 댓글 생성 보내기
      // 필요 내용 받아서 다시 렌더링 (실제로는 리턴으로 받을 가장 최신 댓글 10개로 다시 랜더링)
      const body = {
        content: userInput,
      };
      createPostComment(
        post_id,
        body,
        (notUseResponse) => {
          searchPostDetailComment(
            post_id,
            1,
            (response) => {
              const newdata = response.data.response;
              page = 2;
              setComments(newdata);
              if (newdata.length === 10) {
                setMore(true);
              }
            },
            (error) => {
              console.log(error);
            },
          );
        },
        (error) => {
          console.log(error);
        },
      );
      resetUserInput('');
    }
  };

  const deleteComment = (id) => {
    deletePostComment(
      id,
      (notUseResponse) => {
        searchPostDetailComment(
          post_id,
          1,
          (response) => {
            const newdata = response.data.response;
            page = 2;
            setComments(newdata);
            if (newdata.length === 10) {
              setMore(true);
            }
          },
          (error) => {
            console.log(error);
          },
        );
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const MoreButton = () => {
    if (more) {
      return (
        <div
          onClick={getComment}
          className="rounded text-center cursor-pointer ring-2 p-2 hover:bg-black transition"
        >
          더 보기
        </div>
      );
    } else {
      return (
        <div className="rounded text-center ring-2 p-2 transition">
          댓글이 없어요...
        </div>
      );
    }
  };

  return (
    <div className="h-full rounded hover:scroll-auto overflow-y-scroll scrollbar-hide">
      {/* 댓글 입력 창 */}
      <div className="flex relative w-full">
        <textarea
          className="mx-1 mt-2 mb-1 px-1 py-1 bg-white shadow-md focus:outline-none block w-9/12 rounded-md sm:text-sm focus:ring-2 resize-none scrollbar-hide"
          type="text"
          placeholder="댓글 추가..."
          value={userInput}
          onInput={onChange} // 댓글 남기기 변화 감지
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 "
          onClick={addComment}
        >
          작성
        </button>
      </div>

      {/* 댓글 리스트 */}
      <div className="m-1">
        {comments.map((comment) => {
          return (
            <Comment
              comment={comment}
              key={comment.id}
              deleteComment={deleteComment}
              changeShow={changeShow}
            />
          );
        })}
        <MoreButton />
      </div>
    </div>
  );
};

export default Commentlist;
