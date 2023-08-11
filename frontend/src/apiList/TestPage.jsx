import { useEffect } from 'react';
import { searchBackStageMembmerInfo } from './member';

const TestPage = () => {
  useEffect(() => {
    searchBackStageMembmerInfo(1, (res) => {console.log(res)}, (error) => {console.error(error)})
  }, []);

  return (
    <>
      <div>asdadsf</div>
      {/* 로딩창을 넣어야함. */}
    </>
  );
};

export default TestPage;
