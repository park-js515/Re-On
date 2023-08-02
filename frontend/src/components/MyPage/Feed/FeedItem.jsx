import './Feed.css';
import * as hooks from './hooks';
import * as ItemDetail from './FeedItemDetail';

// test
// 모의 데이터
import * as ItemDetailInfo from './FeedItemDetailInfo';
import * as Sty from './style';
import { useState } from 'react';
const testUrl = 'images/Mypage/videoSample.mp4';

const useComment = () => {
  const [comments, setComments] = useState([]);

  const AddComment = () => {
    setComments((current) => [
      ...current,
      <li key={current.length}>{`${current.length}그만그만그만!!!`}</li>,
    ]);
  };

  return [comments, AddComment];
};

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
  const [comments, AddComment] = useComment();
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
              (❁´◡`❁)
            </ItemDetailInfo.CloseButton>
          </Sty.RowJscEnd>

          <Sty.RowJscCenter>
            <ItemDetailInfo.VideoPlayer url={testUrl} />
          </Sty.RowJscCenter>

          <Sty.RowJscCenter>
            <Sty.RowTrimmed>
              <button
                className='rounded-full bg-info'
                onClick={() => {
                  handleIsPublic();
                }}
              >
                {isPublic ? 'private' : 'public'}
              </button>
              <button
                className="rounded-full bg-lightBlue"
                onClick={() => {
                  AddComment();
                }}
              >
                눌러보세용
              </button>
              <ul className="list-disc">
                <li>{`Public?: ${isPublic}`}</li>
                <li>기타 정보1</li>
                <li>기타 정보2</li>
                <li>기타 정보3</li>
                <li>기타 정보4</li>
                <li>기타 정보5</li>
                {comments.map((comment) => {
                  return comment;
                })}
              </ul>
            </Sty.RowTrimmed>
          </Sty.RowJscCenter>
        </ItemDetail.Modal>
      </div>
    </>
  );
};

export { FeedItem };
