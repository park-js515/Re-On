import { OpenVidu } from 'openvidu-browser';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BackStage from './BackStage';
import UserVideoComponent from './UserVideoComponent';
import Modal from 'components/common/Modal';

import { Container } from '@mui/system';
import Paper from '@mui/material/Paper';

import { useDispatch } from 'react-redux';
import { setSessionStarted } from 'redux/sessionSlice';

import useLoading from 'hooks/useLoading';
import useVideoPlayer from 'hooks/useVideoPlayer';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io';
// process.env.NODE_ENV === 'production' ? '' : 'https://i9c203.p.ssafy.io';

export default function OpenViduApp() {
  const dispatch = useDispatch();
  const [mySessionId, setMySessionId] = useState('REON');
  const [myUserName, setMyUserName] = useState(
    `연기자${Math.floor(Math.random() * 100)}`,
  );
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState(null);

  const OV = useRef(new OpenVidu());

  // const handleChangeSessionId = useCallback((e) => {
  //   setMySessionId(e.target.value);
  // }, []);

  // const handleChangeUserName = useCallback((e) => {
  //   setMyUserName(e.target.value);
  // }, []);

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
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '300x400',
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
  }, [session, myUserName]);

  const leaveSession = useCallback(() => {
    // Leave the session
    if (session) {
      session.disconnect();
    }

    // Reset all states and OpenVidu object
    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('REON');
    setMyUserName('연기자' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);

    dispatch(setSessionStarted(false));
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === 'videoinput',
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice.deviceId,
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.unpublish(mainStreamManager);
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setMainStreamManager(newPublisher);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session, mainStreamManager]);

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
  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId),
    );
  }, [mySessionId]);

  // const createSession = (sessionId) => {
  //   return new Promise((resolve, reject) => {
  //     const data = JSON.stringify({ customSessionId: sessionId });
  //     axios
  //       .post(APPLICATION_SERVER_URL + '/openvidu/api/sessions', data, {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: 'Basic T1BFTlZJRFVBUFA6b3BlbnZpZHVyZW9uYzIwMw==',
  //         },
  //       })
  //       .then((response) => {
  //         console.log('CREATE SESSION', response);
  //         resolve(response.data.id);
  //       })
  //       .catch((response) => {
  //         const error = Object.assign({}, response);
  //         if (error?.response?.status === 409) {
  //           resolve(sessionId);
  //         } else {
  //           console.warn(
  //             'No connection to OpenVidu Server. This may be a certificate error at ' +
  //               APPLICATION_SERVER_URL,
  //           );
  //         }
  //       });
  //   });
  // };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + '/api/sessions',
      // APPLICATION_SERVER_URL + '/openvidu/api/sessions',
      { customSessionId: sessionId },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic T1BFTlZJRFVBUFA6b3BlbnZpZHVyZW9uYzIwMw==',
        },
      },
    );
    await startLoading(5000);
    console.log('SessionSession', response);
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL +
        '/api/sessions/' +
        // '/openvidu/api/sessions/' +
        sessionId +
        '/connections',
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Basic T1BFTlZJRFVBUFA6b3BlbnZpZHVyZW9uYzIwMw==',
        },
      },
    );
    await startLoading(3000);
    console.log('TokenToken', response);
    return response.data; // The token
  };

  // // #################       게임 로그 저장      ####################
  const currentTime = new Date();
  const logMessageTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  const [log, setLog] = useState(['게임 상태를 기록합니다.']);
  const logRef = useRef(null);
  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

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
  }, [isLoading]);

  const logMessage = 'No one in the room.';

  useEffect(() => {
    setLog((prevLog) => [...prevLog, logMessage]);
  }, [logMessage]);

  // ############ 상태 관리 ###############
  const [stage, setStage] = useState('NOT_READY'); // 현재 게임 상태 관리
  const [userCamOneBorder, setUserCamOneBorder] = useState(false); // 유저1 플레이시 테두리
  const [userCamTwoBorder, setUserCamTwoBorder] = useState(false); // 유저2 플레이시 테두리
  const videoRef = useRef(null);

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
    }
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
          setLog((prevLog) => [...prevLog, `${logMessageTime} | 연기 종료`]);
          setUserCamTwoBorder(false);
          setStage('CALCULATION');
        }
      };
      videoRef.current.addEventListener('ended', handleEnded);
      return () => {
        if (videoRef.current) {
          videoRef.current.removeEventListener('ended', handleEnded);
        }
      };
    }
  }, [stage]);

  // ############# 비디오 불러오기 함수 #############
  // 비디오 불러온 상태 true // false 에 따라 안불러왔을 때 디폴트 이미지 보여주기
  // 비디오 불러오기

  // ############# 비디오 플레이 함수 ##############
  const { videoDuration, isPlaying, handleUseVideoPlayerHook } =
    useVideoPlayer(videoRef);

  const handlePlayVideo = async () => {
    await startLoading(3000); // 로딩
    console.log('비디오길이', videoDuration);
    console.log('비디오알이엪', videoRef);
    console.log('비디오컬', videoRef.current);
    setLog((prevLog) => [
      ...prevLog,
      `${logMessageTime} |  작품 : ${videoRef.current.src} 작품 길이 : ${videoDuration} `,
    ]);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 작품 미리보기`]);
    handleUseVideoPlayerHook(); // 영화시작
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
    toggleModal(); // 저장 모달
  };

  // ############# 모달 ##############
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const handleSaveVideo = () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 녹화 저장`]);
    toggleModal();
  };

  return (
    <div className="m-8">
      <Modal
        open={modalVisible}
        title={'녹화저장'}
        description={'녹화를 하시겠습니까??'}
        onConfirm={handleSaveVideo}
        onClose={toggleModal}
        showCancel={true}
      />
      {session === undefined ? (
        <div id="join">
          <BackStage
            myUserName={myUserName}
            mySessionId={mySessionId}
            joinSession={joinSession}
          />
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session" className="flex justify-around">
          {/* <Modal /> */}
          {/* <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              className="btn btn-large btn-success"
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div> */}
          {/* <button onClick={leaveSession}>임시 나가기</button> */}
          <div
            id="movie-container"
            className="border rounded-lg
            flex-col flex justify-evenly w-[400px] "
          >
            <button
              onClick={handlePlayVideo}
              className="border-4 border-mainBlue"
            >
              세션 사람 2명 되면 발생하는 이벤트
            </button>
            <video
              ref={videoRef}
              src="video/ISawTheDevil.mp4"
              className={`h-[450px] mx-4 border rounded-lg ${
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

          {/* {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null} */}
          <div
            id="video-container"
            className="flex flex-wrap border rounded-lg h-[600px] w-[900px]
            place-content-center bg-darkGray"
            style={{
              backgroundImage: `url('image/rank/rank-video-bg.png')`,
            }}
          >
            {publisher !== undefined ? (
              <div
                className={`${
                  userCamOneBorder ? 'border-4 border-danger' : ''
                }`}
                onClick={() => handleMainVideoStream(publisher)}
              >
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                <UserVideoComponent
                  streamManager={sub}
                  className={`${
                    userCamTwoBorder ? 'border-4 border-danger' : ''
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
