import { useEffect } from 'react';
import { searchBackStageMembmerInfo, updateMemberInfo } from './member';

const TestPage = () => {
  useEffect(() => {
    updateMemberInfo(
      { id: 1, introduce: '안녕하세요.', nickName: '주성' },
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
