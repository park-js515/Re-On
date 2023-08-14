import { useEffect, useRef } from 'react';
import { searchAllPublicPost, savePost, uploadPrivatePost } from './post';
import { searchBattleLog } from './member';

const TestPage = () => {
  const check = useRef(false);
  const formData = new FormData();


  useEffect(() => {
    if(check.current === false) {
      uploadPrivatePost(
        1,
        {content: "asdf", title: "aaa"},
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
