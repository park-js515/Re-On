import { useEffect, useRef } from 'react';
import { searchBackStageMembmerInfo, searchMypageMemberInfo} from './member';
import { searchAllPublicPost, searchPublicPostDetail } from './post';
import { postInstance } from './lib/index';


const TestPage = () => {
  const check = useRef(false);
  useEffect(() => {
    if(check.current === false) {
      searchAllPublicPost(   
        1,
        (res) => {
          console.log(res); 
        },
        (error) => {
          console.error(error);
        },
      );
    }

    return () => {
      check.current = true;
    }
  }, []);

  return (
    <>
      <div>asdadsf</div>
      {/* 로딩창을 넣어야함. */}
    </>
  );
};

export default TestPage;
