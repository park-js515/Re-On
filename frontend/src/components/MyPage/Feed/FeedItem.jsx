import './Feed.css';
import * as hooks from './hooks';
import * as ItemDetail from './FeedItemDetail';

// test
// 모의 데이터
import * as ItemDetailInfo from './FeedItemDetailInfo';
import * as Sty from './style';
import * as Comment from './FeedComment';
import { useState } from 'react';

const testUrl = 'images/Mypage/videoSample.mp4';
const data = [
  { text: '1', childComments: ['1'] },
  { text: '2', childComments: ['1', '2'] },
  { text: '3', childComments: ['1', '2', '3'] },
  { text: '4', childComments: ['1', '2', '3', '4'] },
];

const useToggle = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle((current) => !current);
  };

  return [toggle, handleToggle];
};

//

const FeedItem = ({ top, bot, ...props }) => {
  const { isOpen, handleIsOpen } = hooks.useModal();
  const [isPublic, handleIsPublic] = useToggle();

  return (
    <>
      <div className="group">
        <img
          className="Feed-FeedItemTop group-hover:opacity-70"
          src={top}
          onClick={handleIsOpen}
          alt="alt"
          {...props}
        />
        <div
          onClick={handleIsOpen}
          className="Feed-FeedItemBot group-hover:underline"
        >
          {bot}
        </div>

        <ItemDetail.Modal isOpen={isOpen} handleIsOpen={handleIsOpen}>
          <Sty.RowJscEnd>
            <ItemDetailInfo.CloseButton onClick={handleIsOpen}>
              ❌
            </ItemDetailInfo.CloseButton>
          </Sty.RowJscEnd>

          <Sty.RowJscCenter>
            <ItemDetailInfo.VideoPlayer url={testUrl} />
          </Sty.RowJscCenter>

          <Sty.RowJscCenter>
            <Sty.RowTrimmed>
              <button
                className="rounded-full bg-info"
                onClick={() => {
                  handleIsPublic();
                }}
              >
                {isPublic ? 'private' : 'public'}
              </button>
              <p>{`Public?: ${isPublic}`}</p>

              <ol>
                <li>1. 프로필 사진</li>
                <li>2. 닉네임</li>
                <li><s>3. 연기동영상</s></li>
                <li>4. 소개 글</li>
                <li>5. 좋아요 버튼</li>
                <li>6. 좋아요 갯수</li>
                <li>7. 편집</li>
                <li>8. 댓글 수정</li>
                <li>9. 댓글 정보(comment, 이동 등...)</li>
              </ol>

              <p style={{ fontSize: '1.5rem' }}>댓글 목록</p>

              {data.map((d, index) => {
                return (
                  <Comment.CommentContainer>
                    <Comment.Comment {...d} key={index}></Comment.Comment>
                  </Comment.CommentContainer>
                );
              })}
            </Sty.RowTrimmed>
          </Sty.RowJscCenter>
        </ItemDetail.Modal>
      </div>
    </>
  );
};

export { FeedItem };
