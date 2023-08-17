import React from 'react';
import Videoitem from './Videoitem';
import { useState, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  searchAllPublicPost,
  searchPublicPost,
  searchLikePost,
  searchPrivatePost,
} from 'apiList/post';

// type은 AllPublic, Posts, Private, Likes => 투표해줘 전체 조회, 마이페이지 공개 조회, 마이페이지 비공개, 마이페이지 좋아한 영상 조회
const Videolist = ({ type }) => {
  const [data, setData] = useState([]);
  const [rest, setRest] = useState(true);
  const { email } = useParams();
  let page = 1;

  function addData() {
    if (rest) {
      if (type === 'AllPublic') {
        searchAllPublicPost(
          page,
          (response) => {
            const newdata = response.data.response;
            if (newdata.length > 0) {
              page++;
              if (newdata.length < 21) {
                setRest(false);
              }
              setData((data) => {
                return [...data, ...newdata];
              });
            } else {
              setRest(false);
            }
          },
          (error) => {},
        );
      } else if (type === 'Posts') {
        searchPublicPost(
          page,
          email,
          (response) => {
            const newdata = response.data.response;
            if (newdata.length > 0) {
              setData((data) => {
                return [...data, ...newdata];
              });
              page++;
              if (newdata.length < 21) {
                setRest(false);
              }
            } else {
              setRest(false);
            }
          },
          (error) => {},
        );
      } else if (type === 'Likes') {
        searchLikePost(
          page,
          (response) => {
            const newdata = response.data.response;
            if (newdata.length > 0) {
              page++;
              setData((data) => {
                return [...data, ...newdata];
              });
              if (newdata.length < 21) {
                setRest(false);
              }
            } else {
              setRest(false);
            }
          },
          (error) => {},
        );
      } else if (type === 'Private') {
        searchPrivatePost(
          page,
          (response) => {
            const newdata = response.data.response;
            if (newdata.length > 0) {
              page++;
              setData((data) => {
                return [...data, ...newdata];
              });
              if (newdata.length < 21) {
                setRest(false);
              }
            } else {
              setRest(false);
            }
          },
          (error) => {},
        );
      }
    }
  }

  function delItem(id) {
    setData((current) => {
      const ret = current.filter((item) => item.id !== id);
      return ret;
    });
  }

  // 무한스크롤
  const target = useRef();
  const options = {
    threshold: 0.5,
  };
  const observer = new IntersectionObserver(addData, options);

  useEffect(() => {
    observer.observe(target.current);
    return () => {
      setData([]);
    };
  }, []);

  // 검색
  const [searchTerm, setSearchTerm] = useState(''); // 검색어를 저장하는 상태

  const filteredData = data.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="py-8 sm:py-8 ">
      <div className="bg-white bg-opacity-50 mx-auto max-w-7xl px-2 lg:px-8 rounded-lg">
        {type === 'AllPublic' ? (
          <>
            <h1 className="my-8 py-24 text-center font-bold text-3xl text-dark ">
              💌투표해줘
            </h1>
            <div className="flex justify-end my-4 rounded">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search by title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="py-2 px-4 w-64 shadow-xl rounded-md focus:ring focus:ring-opacity-50"
                />
                <span className="absolute inset-y-0 right-4 flex items-center text-gray-400">
                  🔍
                </span>
              </div>
            </div>
          </>
        ) : null}

        <div className=" mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:mt-8 sm:pt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {filteredData.map((item) => {
            return <Videoitem key={item.id} props={item} type={type} delItem={delItem}/>;
          })}
        </div>
        <div className="text-center py-12 font-semibold text-lg" ref={target}>
          {rest ? '🚝' : ''}
        </div>
      </div>
    </div>
  );
};

export default Videolist;
