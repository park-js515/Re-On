import { useNavigate } from 'react-router-dom';
import styles from "./Test.module.css";

const Test = () => {
  // Navigate 함수 가져오기
  const navigate = useNavigate();
  const isLoggedIn = false;

  const handleButtonClick = () => {
    if (isLoggedIn) {
        navigate('/rank');
    } else {
        alert('로그인 먼저 하쇼.');
        navigate('/login');  // 로그인 페이지 경로로 설정하십시오.
    }
}
  return (

    
    <div className={styles.testContainer}>
      <h1 className={styles.testTitle}>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <span className={styles.testTitleSpan}>R</span>
          <span className={styles.testTitleSpan}>E</span>
          <span className={styles.testTitleSpan}>O</span>
          <span className={styles.testTitleSpan}>N</span>
          <br />
          <span className={styles.testTitleSpan}>C</span>
          <span className={styles.testTitleSpan}>A</span>
          <span className={styles.testTitleSpan}>R</span>
          <span className={styles.testTitleSpan}>P</span>
          <span className={styles.testTitleSpan}>E</span>
          <span className={styles.testTitleSpan}>T</span>
          <span className={styles.testTitleSpan}>!</span>
          <div className="flex justify-center"> 

         
            <button 
                className="bg-info text-white px-4 py-4 rounded hover:bg-lightBlue ml-0 mr-0 w-96 text-2xl hover:scale-105 "
                onClick={handleButtonClick}
            >
                REON 바로시작하기
            </button>
       
          </div>
      </h1>
    </div>
    
  );
}

export default Test;
