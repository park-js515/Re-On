import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import BackStage from './BackStage';
import UserVideoComponent from './UserVideoComponent';
import Matching from 'components/Typing/Matching';
import LoadingWaiting from 'components/RankGame/LoadingWaiting';
import MatchingWaiting from 'components/RankGame/MatchingWaiting';
import Modal from 'components/RankGame/Modal';
import TutorialModal from 'components/RankGame/TutorialModal';

import Paper from '@mui/material/Paper';

import { useDispatch } from 'react-redux';
import { setSessionStarted } from 'redux/sessionSlice';

import useLoading from 'hooks/useLoading';
import useVideoPlayer from 'hooks/useVideoPlayer';

const APPLICATION_SERVER_URL =
  // process.env.NODE_ENV === 'production' ? '' : 'https://i9c203.p.ssafy.io';
  process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io';

export default function OpenViduApp() {
  const dispatch = useDispatch();
  const [mySessionId, setMySessionId] = useState('TEST');
  const [myUserName, setMyUserName] = useState(
    `연기자${Math.floor(Math.random() * 100)}`,
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const OV = useRef(new OpenVidu());

  const handleMainVideoStream = useCallback(
    (stream) => {
      if (mainStreamManager !== stream) {
        setMainStreamManager(stream);
      }
    },
    [mainStreamManager],
  );

  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
      setLog((prevLog) => [
        ...prevLog,
        `${logMessageTime} | 상대방이 참여했습니다.`,
      ]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setSession(mySession);

    dispatch(setSessionStarted(true));
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 참가했습니다.`]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          console.log('토큰', token);
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '350x400',
            frameRate: 30,
            insertMode: 'APPEND',
            mirror: true,
          });

          session.publish(publisher);

          const devices = await OV.current.getDevices();
          const videoDevices = devices.filter(
            (device) => device.kind === 'videoinput',
          );
          const currentVideoDeviceId = publisher.stream
            .getMediaStream()
            .getVideoTracks()[0]
            .getSettings().deviceId;
          const currentVideoDevice = videoDevices.find(
            (device) => device.deviceId === currentVideoDeviceId,
          );

          setMainStreamManager(publisher);
          setPublisher(publisher);
          setCurrentVideoDevice(currentVideoDevice);
        } catch (error) {
          console.log(
            'There was an error connecting to the session:',
            error.code,
            error.message,
          );
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session, myUserName]);

  // 세션 나가기
  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    OV.current = new OpenVidu();
    // 나가면 사용자 상태 초기화
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('TEST');
    setMyUserName('연기자' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);

    dispatch(setSessionStarted(false)); // 리덕스 세션상태 제거
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  // 참여자 제거
  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
    setLog((prevLog) => [
      ...prevLog,
      `${logMessageTime} | 상대방이 나갔습니다.`,
    ]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      leaveSession();
    };
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [leaveSession]);

  /**
   * --------------------------------------------
   * GETTING A TOKEN FROM YOUR APPLICATION SERVER
   * --------------------------------------------
   * The methods below request the creation of a Session and a Token to
   * your application server. This keeps your OpenVidu deployment secure.
   *
   * In this sample code, there is no user control at all. Anybody could
   * access your application server endpoints! In a real production
   * environment, your application server must identify the user to allow
   * access to the endpoints.
   *
   * Visit https://docs.openvidu.io/en/stable/application-server to learn
   * more about the integration of OpenVidu in your application server.
   */

  // 원본
  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId),
    );
  }, [mySessionId]);

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + '/api/sessions',
      { customSessionId: sessionId },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('SessionSession', response);
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + '/api/sessions/' + sessionId + '/connections',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('TokenToken', response);
    return response.data; // The token
  };

  // 테스트
  // const getToken = useCallback(async () => {
  //   return testGetResponse().then((response) => response);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [mySessionId]);

  // const testGetResponse = async () => {
  //   try {
  //     const response = await axios.post(
  //       APPLICATION_SERVER_URL + '/openvidu/api/sessions/REON/connection',
  //       {}, // body
  //       {
  //         headers: {
  //           Authorization: 'Basic T1BFTlZJRFVBUFA6b3BlbnZpZHVyZW9uYzIwMw==',
  //           // Basic 다음의 값은 'username:password' 형식을 Base64 인코딩한 것
  //           // username은 OPENVIDUAPP
  //           // password는 <YOUR_SECRET>
  //           'Content-Type': 'application/json',
  //         },
  //       },
  //     );
  //     console.log('응답', response);
  //     return response.data;
  //   } catch (error) {
  //     console.error('에러', error); // 오류 로깅
  //   }
  // };

  // ################################################################
  // ################################################################
  // #################이 위로 OpenVidu 상태 관리#####################
  // ################################################################
  // ################################################################
  // #################이 밑으로 랭크게임 상태 관리###################
  // ################################################################
  // ################################################################

  // #################       게임 로그 저장      ####################
  const currentTime = new Date();
  const logMessageTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  const [log, setLog] = useState(['게임 상태를 기록합니다.']);
  const logRef = useRef(null);
  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const logMessage = 'No one in the room.';

  useEffect(() => {
    setLog((prevLog) => [...prevLog, logMessage]);
  }, [logMessage]);

  // ################# useLoading 훅 사용 #################
  const { isLoading, startLoading } = useLoading(false, 5000);

  useEffect(() => {
    let intervalId;
    if (isLoading) {
      setLog((prevLog) => [...prevLog, ` ${logMessageTime} | 로딩 시작`]);
      let counter = 0;
      intervalId = setInterval(() => {
        setLog((prevLog) => [...prevLog, `${counter}초`]);
        counter++;
      }, 1000);
    } else {
      clearInterval(intervalId);
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 로딩 종료`]);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  // ############ 상태 관리 ###############
  const [stage, setStage] = useState('NOT_READY'); // 현재 게임 상태 관리
  const [userCamOneBorder, setUserCamOneBorder] = useState(false); // 유저1 플레이시 테두리
  const [userCamTwoBorder, setUserCamTwoBorder] = useState(false); // 유저2 플레이시 테두리

  // ############# 비디오 플레이 훅 ##############
  // useEffect보다 위에 선언해야 했다.
  const { videoRef, isPlaying, handlePlayVideo } = useVideoPlayer();

  // ############ 턴 시작 ###############
  useEffect(() => {
    // 영화 미리보기
    if (stage === 'WATCHING_MOVIE') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 작품 미리보기`]);
      // 유저 1 차례
    } else if (stage === 'USER_ONE_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 첫번째 연기 시작`]);
      handleUserOnePlay();
      // 유저 2 차례
    } else if (stage === 'USER_TWO_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 두번째 연기 시작`]);
      handleUserTwoPlay();
      // 점수계산
    } else if (stage === 'CALCULATION') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 계산 시작`]);
      handleCaculateScore();
    } else if (stage === 'END') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 게임 종료`]);
      setToggleSaveModal(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // ############ 턴 종료 ###############

  useEffect(() => {
    if (videoRef.current) {
      const handleEnded = () => {
        // 영화 미리보기 종료
        if (stage === 'WATCHING_MOVIE') {
          setLog((prevLog) => [
            ...prevLog,
            `${logMessageTime} | 작품 미리보기 종료`,
          ]);
          setStage('USER_ONE_TURN');
          // 유저1 턴 종료
        } else if (stage === 'USER_ONE_TURN') {
          setLog((prevLog) => [
            ...prevLog,
            `${logMessageTime} | 첫번째 연기 종료`,
          ]);
          setUserCamOneBorder(false);
          setStage('USER_TWO_TURN');
          // 유저2 턴 종료
        } else if (stage === 'USER_TWO_TURN') {
          setLog((prevLog) => [
            ...prevLog,
            `${logMessageTime} | 두번째 연기 종료`,
          ]);
          setUserCamTwoBorder(false);
          setStage('CALCULATION');
        }
      };
      // 비디오 요소에 이벤트 리스너 추가
      videoRef.current.addEventListener('ended', handleEnded); // ended면 handleEnded() 실행
      // 클린업 함수에서 이벤트 리스너 제거
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoRef, stage]); // videoRef 변화 시 useEffect 실행

  // ############# 비디오 불러오기 함수 #############
  const handleLoadVideo = async () => {
    // setVideoSrc('video/ISawTheDevil.mp4'); // 비디오 URL 업데이트 (유튜브 API 요청해서 영상 소스 받아올 것)
    await startLoading(3000); // 로딩
    setLog((prevLog) => [
      ...prevLog,
      `${logMessageTime} |  작품 : ${videoRef.current.src} 작품 길이 : ${videoRef.current.duration} `,
    ]);
    handlePlayVideo(); // 비디오 플레이
    setStage('WATCHING_MOVIE');
  };

  // ############# 유저1 플레이 함수 ##############
  const handleUserOnePlay = async () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 대기`]);
    await startLoading(3000); // 로딩
    setUserCamOneBorder(true);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 시작`]);
    handlePlayVideo();
  };

  // ############# 유저2 플레이 함수 ##############
  const handleUserTwoPlay = async () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 대기`]);
    await startLoading(3000); // 로딩
    setUserCamTwoBorder(true);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 시작`]);
    handlePlayVideo();
  };

  // ############# 점수 계산 ##############
  const handleCaculateScore = async () => {
    //  AI계산
    setLog((prevLog) => [...prevLog, `${logMessageTime} | AI 점수 계산`]);
    setStage('END');
    await startLoading(3000);
  };

  // ############# 녹화 저장 함수 ##############
  const handleSaveVideo = async () => {
    await startLoading(2000);
    setLog((prevLog) => [
      ...prevLog,
      `${logMessageTime} | 녹화 영상을 저장했습니다!`,
    ]);
  };

  // ############# 모달 ##############
  const [toggleExitModal, setToggleExitModal] = useState(false);
  const [toggleSaveModal, setToggleSaveModal] = useState(false);
  const [toggleTutorialModal, setToggleTutorialModal] = useState(false);

  return (
    <div className="m-8">
      {toggleSaveModal && (
        <Modal
          type="save"
          onConfirm={handleSaveVideo}
          isOpen={toggleSaveModal}
          onClose={() => setToggleSaveModal(false)}
        />
      )}
      {session === undefined ? (
        <div id="join" >
          <BackStage
            myUserName={myUserName}
            mySessionId={mySessionId}
            joinSession={joinSession}
          />
        </div>
      ) : null}
      {/* 백스테이지 */}

      {session !== undefined ? (
        <div id="session" className="flex justify-around gap-4">
          {isLoading && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <LoadingWaiting />
            </div>
          )}
          <div
            id="movie-container"
            className="border rounded-lg
            flex-col flex justify-evenly w-[400px] "
          >
            <button
              onClick={handleLoadVideo}
              className="border-4 border-mainBlue"
            >
              세션 사람 2명 되면 발생하는 이벤트
            </button>
            <video
              ref={videoRef}
              src="video/ISawTheDevil.mp4"
              poster="image/rank/rank-reon.png"
              className={`h-[450px] mx-4 rounded-lg ${
                isPlaying ? 'border-4 border-danger' : ''
              }`}
            />

            <Paper
              style={{ backgroundColor: '#f5f5f5' }}
              className="h-[100px] mx-4 overflow-auto"
            >
              {log.map((item, index) => (
                <div key={index} ref={logRef}>
                  {item}
                </div>
              ))}
            </Paper>
          </div>
          {/* 왼쪽 */}

          <div
            id="video-container"
            className="border rounded-lg h-[600px] w-[1000px]
            bg-darkGray"
            style={{
              backgroundImage: `url('image/rank/rank-video-bg.png')`,
            }}
          >
            <div className="flex flex-wrap place-content-center gap-10 mt-5">
              {publisher !== undefined ? (
                <div
                  className={`${
                    userCamOneBorder ? 'border-4 border-danger' : ''
                  }`}
                  onClick={() => handleMainVideoStream(publisher)}
                >
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                  <LoadingWaiting />
                </div>
              )}

              {subscribers.length > 0 ? (
                subscribers.map((sub, i) => (
                  <div
                    key={sub.id}
                    className={userCamTwoBorder ? 'border-4 border-danger' : ''}
                    onClick={() => handleMainVideoStream(sub)}
                  >
                    <span>{sub.id}</span>
                    <UserVideoComponent
                      streamManager={sub}
                      className={
                        userCamTwoBorder ? 'border-4 border-danger' : ''
                      }
                    />
                  </div>
                ))
              ) : (
                <div>
                  <div className="flex text-white">
                    <Matching typingContent="..." />
                  </div>
                  <div className="relative flex items-center justify-center w-[350px] h-[400px]">
                    <img
                      src="image/rank/rank-basic-bg.png"
                      alt="waiting"
                      className="absolute top-0 left-0 w-full h-full"
                    />
                    <MatchingWaiting />
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center gap-8 mt-10">
              {/* 튜토리얼 버튼 */}
              {toggleTutorialModal && (
                <TutorialModal
                  type="tutorial"
                  onConfirm={leaveSession}
                  isOpen={toggleTutorialModal}
                  onClose={() => setToggleTutorialModal(false)}
                />
              )}
              <button
                className="bg-green rounded-lg w-[50px] h-[50px] m-0 flex items-center justify-center"
                onClick={() => setToggleTutorialModal(true)}
              >
                <img
                  src="image/rank/rank-tutorial-btn.png"
                  alt="tutorial-btn"
                  className="w-[30px] hover:w-[40px] transition-all duration-300"
                />
              </button>

              {/* 나가기 버튼 */}
              {toggleExitModal && (
                <Modal
                  type="exit"
                  onConfirm={leaveSession}
                  isOpen={toggleExitModal}
                  onClose={() => setToggleExitModal(false)}
                />
              )}
              <button
                className="bg-danger rounded-lg w-[50px] h-[50px] flex items-center justify-center"
                onClick={() => setToggleExitModal(true)}
              >
                <img
                  src="image/rank/rank-exit-btn.png"
                  alt="exit-btn"
                  className="w-[40px] hover:w-[50px] transition-all duration-300"
                />
              </button>
            </div>
            {/* 버튼 */}
          </div>
          {/* 오른쪽 */}
        </div>
      ) : // 배틀룸
      null}
    </div>
  );
}
