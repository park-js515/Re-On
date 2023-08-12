import { useEffect } from 'react';
import { searchBackStageMembmerInfo, searchMypageMemberInfo} from './member';
import { searchAllPublicPost, searchPublicPostDetail } from './post';
import { postInstance } from './lib/index';


const TestPage = () => {
  useEffect(() => {
    searchAllPublicPost(   
      1,
      (res) => {
        console.log(res); 
      },
      (error) => {
        console.error(error);
      },
    );
  }, []);

  return (
    <>
      <div>asdadsf</div>
      {/* 로딩창을 넣어야함. */}
    </>
  );
};

export default TestPage;
