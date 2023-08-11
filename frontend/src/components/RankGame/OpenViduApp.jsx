/* eslint-disable jsx-a11y/alt-text */
import { OpenVidu } from 'openvidu-browser';
import './OpenVidu.css';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BackStage from './BackStage';
import UserVideoComponent from './UserVideoComponent';
import Matching from 'components/Typing/Matching';
import LizardLoading from 'components/RankGame/Loading/LizardLoading';
import MatchingWaiting from 'components/RankGame/Loading/MatchingWaiting';
import CountLoading from 'components/RankGame/Loading/CountLoading';
import Modal from 'components/RankGame/Modal/Modal';
import TutorialModal from 'components/RankGame/Modal/TutorialModal';
import EndCurtain from 'components/RankGame/Modal/EndCurtain';
import * as faceapi from 'face-api.js';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setIsJoinSession } from 'redux/sessionSlice';

import useLoading from 'hooks/useLoading';
import useVideoPlayer from 'hooks/useVideoPlayer';

const APPLICATION_SERVER_URL =
  process.env.NODE_ENV === 'production' ? '' : 'https://i9c203.p.ssafy.io';
// process.env.NODE_ENV === 'production' ? '' : 'https://demos.openvidu.io';

export default function OpenViduApp() {
  const dispatch = useDispatch();
  // 세션 아이디는 이제 설정해줄 필요가 없어보인다.
  // 그냥 /api/openvidu-management/sessions/connections에 POST하면 알아서 세션 만들어서 연결해주기 때문
  const [mySessionId, setMySessionId] = useState('TEST');
  // myUserName은 리덕스||로컬스토리지에 자기 이름을 보여준다.
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

  const [mySide, setMySide] = useState(null); // mySide 상태 선언
  const joinSession = useCallback(() => {
    const mySession = OV.current.initSession();
    const connections = [];
    mySession.on('connectionCreated', async (event) => {
      connections.push(event.connection);
    });

    mySession.on('streamCreated', async (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);

      // ++++++++++++유저 순서 구하기+++++++++++++++++++++++
      const subscriberId = subscriber.stream.streamId.slice(-14); // 상대 커넥션 아이디

      // 커넥션 정보 시간 순으로 정렬
      const sortedConnections = connections.sort(
        (a, b) => a.creationTime - b.creationTime,
      );

      const firstUserId = sortedConnections[0].connectionId; // 먼저 온 유저 커넥션 ID
      const secondUserId = sortedConnections[1].connectionId; // 나중에 온 유저 커넥션 ID

      // 상대유저가 나중에 온 유저면, 나는 먼저 온 유저(첫번째)
      const me = subscriberId === secondUserId ? 'USER_ONE' : 'USER_TWO';
      setMySide(me); // 상태 업데이트
      if (mySide == 'USER_ONE') {
        setLog((prevLog) => [...prevLog, `당신은 첫번째차례 입니다!`]);
      } else {
        setLog((prevLog) => [...prevLog, `당신은 두번째차례 입니다!`]);
      }
      // +++++++++++++++++++++++++++++++++++++++++++++++++++++++

      // 시그널 보내기
      mySession.signal({
        data: 'playVideo', // Optional, any string to send to the other participant
        type: 'playVideo', // Optional, used to define custom signal types
      });
    });

    // 시그널 받기
    mySession.on('signal:playVideo', async (event) => {
      // 시그널을 받으면 비디오 재생을 처리
      setLog((prevLog) => [...prevLog, `게임을 시작합니다.`]);
      await startLoading('count', 5000); // 로딩 5초
      handleLoadVideo(); // 영상 시작
    });

    mySession.on('streamDestroyed', async (event) => {
      await startLoading('lizard', 1000); // 로딩 5초
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setSession(mySession);

    dispatch(setIsJoinSession(true));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session) {
      // Get a token from the OpenVidu deployment
      getToken().then(async (token) => {
        try {
          console.log('토큰', token);
          await session.connect(token.response, { clientData: myUserName });

          let publisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: '500x400',
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
  const leaveSession = useCallback(async () => {
    if (session) {
      session.disconnect();
      setStage('READY');
      await closeSession(session.sessionId);
      window.location.reload(); // 그냥 새로고침 하자...세션 끊기는게 너무 느려~~~~!
    }

    OV.current = new OpenVidu();
    // 나가면 사용자 상태 초기화
    setSession(undefined);
    setSubscribers([]);
    setMySessionId('TEST');
    setMyUserName('연기자' + Math.floor(Math.random() * 100));
    setMainStreamManager(undefined);
    setPublisher(undefined);

    dispatch(setIsJoinSession(false)); // 리덕스 세션상태 제거
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
      `상대가 나갔습니다. 게임을 종료하겠습니다.`,
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

  // 기본 오픈비두 서버 API 요청
  // const getToken = useCallback(async () => {
  //   return createSession(mySessionId).then((sessionId) =>
  //     createToken(sessionId),
  //   );
  // }, [mySessionId]);

  // const createSession = async (sessionId) => {
  //   const response = await axios.post(
  //     APPLICATION_SERVER_URL + '/api/sessions',
  //     { customSessionId: sessionId },
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   );
  //   return response.data; // The sessionId
  // };

  // const createToken = async (sessionId) => {
  //   const response = await axios.post(
  //     APPLICATION_SERVER_URL + '/api/sessions/' + sessionId + '/connections',
  //     {},
  //     {
  //       headers: { 'Content-Type': 'application/json' },
  //     },
  //   );
  //   return response.data; // The token
  // };

  const getToken = async () => {
    try {
      const response = await axios.post(
        APPLICATION_SERVER_URL +
          '/api/openvidu-management/sessions/connections',
        {}, // body
        {
          headers: {
            Authorization: 'Basic T1BFTlZJRFVBUFA6b3BlbnZpZHVyZW9uYzIwMw==',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('응답', response);
      return response.data;
    } catch (error) {
      console.error('에러', error); // 오류 로깅
    }
  };

  const closeSession = async (sessionId) => {
    try {
      const response = await axios.delete(
        APPLICATION_SERVER_URL +
          `/api/openvidu-management/sessions/${sessionId}/delete`,
        {}, // body
        {
          headers: {
            Authorization: 'Basic T1BFTlZJRFVBUFA6b3BlbnZpZHVyZW9uYzIwMw==',
            'Content-Type': 'application/json',
          },
        },
      );
      console.log('응답', response);
      return response.data;
    } catch (error) {
      console.error('에러', error); // 오류 로깅
    }
  };

  // ################################################################
  // ################################################################
  // #################이 위로 OpenVidu 상태 관리#####################
  // ################################################################
  // ################################################################
  // #################이 밑으로 랭크게임 상태 관리###################
  // ################################################################
  // ################################################################

  // #################### 초롱이초롱초롱AI ##########################
  const ort = require('onnxruntime-web/webgpu');
  const [ortSession, setOrtSession] = useState(null);
  useEffect(() => {
    async function createSession() {
      try {
        setOrtSession(
          await ort.InferenceSession.create('reon_model-2.onnx', {
            executionProviders: ['webgl'],
          }),
        );
        faceapi.nets.tinyFaceDetector.loadFromUri('models');
      } catch (e) {
        document.write(`failed to inference ONNX model: ${e}.`);
      }
    }
    createSession();
    return () => {
      setOrtSession(null);
    };
  }, []);

  let myInterval = null;
  let frame_cnts = 0;
  let sum_diff = 0;
  function face_detect() {
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@ face_detect');
    const video = document.getElementById(mySide);
    const origin = document.getElementById('origin');
    // const canvas = faceapi.createCanvasFromMedia(video);

    // origin.addEventListener('loadeddata', () => {
    //   const origin_canvas = faceapi.createCanvasFromMedia(origin);
    //   faceapi.matchDimensions(origin_canvas, originSize);
    // });

    const originSize = { width: 224, height: 224 };
    const videoSize = { width: 224, height: 224 };
    // faceapi.matchDimensions(canvas, videoSize);
    const FPS = 5;
    myInterval = setInterval(async () => {
      const start = new Date();
      const video_detections = await faceapi.detectAllFaces(
        video,
        new faceapi.TinyFaceDetectorOptions(),
      );
      const origin_detections = await faceapi.detectAllFaces(
        origin,
        new faceapi.TinyFaceDetectorOptions(),
      );

      const resizedDetections_video = faceapi.resizeResults(
        video_detections,
        videoSize,
      );
      const resizedDetections_origin = faceapi.resizeResults(
        origin_detections,
        originSize,
      );
      // canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
      // faceapi.draw.drawDetections(canvas, resizedDetections);
      if (
        resizedDetections_video.length > 0 &&
        resizedDetections_origin.length > 0
      ) {
        try {
          await image_classification(
            resizedDetections_video[0].box,
            resizedDetections_origin[0].box,
          );
        } catch {
          console.log('오류 발생');
        }
      }
      console.log(new Date() - start);
    }, 1000 / FPS);
  }
  async function image_classification(box1, box2) {
    const [x1, y1, w1, h1] = [box1.x, box1.y, box1.width, box1.height];
    const [x2, y2, w2, h2] = [box2.x, box2.y, box2.width, box2.height];
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];
    const imageData1 = resizeImage(x1, y1, w1, h1);
    const imageData2 = resizeImage(x2, y2, w2, h2);

    // Create a new Float32Array for the input tensor
    const inputData1 = new Float32Array(1 * 3 * 224 * 224);
    const inputData2 = new Float32Array(1 * 3 * 224 * 224);
    const pixels = 224 * 224;

    // 데이터 정규화
    for (let i = 0; i < pixels; i++) {
      inputData1[i * 3] = (imageData1.data[i * 4] / 255.0 - mean[0]) / std[0]; // R
      inputData1[i * 3 + 1] =
        (imageData1.data[i * 4 + 1] / 255.0 - mean[1]) / std[1]; // G
      inputData1[i * 3 + 2] =
        (imageData1.data[i * 4 + 2] / 255.0 - mean[2]) / std[2]; // B
      inputData2[i * 3] = (imageData2.data[i * 4] / 255.0 - mean[0]) / std[0]; // R
      inputData2[i * 3 + 1] =
        (imageData2.data[i * 4 + 1] / 255.0 - mean[1]) / std[1]; // G
      inputData2[i * 3 + 2] =
        (imageData2.data[i * 4 + 2] / 255.0 - mean[2]) / std[2]; // B
    }

    // Create ONNX tensor from the input array
    const inputTensor1 = new ort.Tensor(
      'float32',
      inputData1,
      [1, 3, 224, 224],
    );
    const inputTensor2 = new ort.Tensor(
      'float32',
      inputData2,
      [1, 3, 224, 224],
    );
    const inputName = ortSession.inputNames[0];
    const outputName = ortSession.outputNames[0];
    const input1 = { [inputName]: inputTensor1 };
    const input2 = { [inputName]: inputTensor2 };
    const output1 = await ortSession.run(input1);
    const output2 = await ortSession.run(input2);
    let probs1 = output1[outputName].data;
    let probs2 = output2[outputName].data;
    const total1 = probs1.reduce((a, b) => a + Math.exp(b), 0);
    const total2 = probs2.reduce((a, b) => a + Math.exp(b), 0);
    probs1 = probs1.map((prob) => {
      return (Math.exp(prob) / total1).toFixed(2);
    });
    probs2 = probs2.map((prob) => {
      return (Math.exp(prob) / total2).toFixed(2);
    });
    for (let i = 0; i < 7; i++) {
      sum_diff += Math.abs(probs1[i] - probs2[i]);
    }
    frame_cnts++;
  }

  function resizeImage(x, y, w, h) {
    const video = document.getElementById(mySide);
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = w;
    cropCanvas.height = h;
    const cropContext = cropCanvas.getContext('2d');

    cropContext.drawImage(video, x, y, w, h, 0, 0, w, h);
    const croppedImageData = cropContext.getImageData(0, 0, w, h);

    const resizedCanvas = document.createElement('canvas');
    resizedCanvas.width = 224;
    resizedCanvas.height = 224;
    const resizedContext = resizedCanvas.getContext('2d');

    resizedContext.drawImage(cropCanvas, 0, 0, w, h, 0, 0, 224, 224);
    return resizedContext.getImageData(0, 0, 224, 224);
  }

  // #################       게임 로그 저장      ####################
  const currentTime = new Date();
  const logMessageTime = `${currentTime.getHours()}:${currentTime.getMinutes()}:${currentTime.getSeconds()}`;
  const [log, setLog] = useState(['반갑습니다. REON입니다.']);
  const logRef = useRef(null);

  useEffect(() => {
    logRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [log]);

  const logMessage = null;

  useEffect(() => {
    setLog((prevLog) => [...prevLog, logMessage]);
  }, [logMessage]);

  // ################# useLoading 훅 사용 #################
  const { loadingState, startLoading } = useLoading(
    { isLoading: false, type: 'count' },
    5000,
  );

  useEffect(() => {
    let intervalId;
    if (loadingState.isLoading) {
      let counter = 0;
      intervalId = setInterval(() => {
        counter++;
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingState]);

  // ############ 상태 관리 ###############
  const [stage, setStage] = useState('READY'); // 현재 게임 상태 관리
  const [userCamLeftBorder, setUserCamLeftBorder] = useState(false); // 유저1 플레이시 테두리
  const [userCamRightBorder, setUserCamRightBorder] = useState(false); // 유저2 플레이시 테두리
  const [recordOn, setRecordOn] = useState(false);

  // ############# 비디오 플레이 훅 ##############
  // useEffect보다 위에 선언해야 했다.
  const { videoRef, isPlaying, handlePlayVideo } = useVideoPlayer();

  // ############ 턴 시작 ###############
  useEffect(() => {
    // 영화 미리보기
    if (stage === 'WATCHING_MOVIE') {
      setLog((prevLog) => [...prevLog, `연기를 감상해보세요!`]);

      // 내가 유저 1이면서 첫번째 차례
    } else if (mySide === 'USER_ONE' && stage === 'USER_ONE_TURN') {
      setLog((prevLog) => [...prevLog, `당신 차례입니다. 연기를 준비하세요!!`]);
      if (stage !== 'END') {
        handleUserOnePlay();
      }

      // 내가 유저 1이면서 두번째 차례
    } else if (mySide === 'USER_ONE' && stage === 'USER_TWO_TURN') {
      setLog((prevLog) => [...prevLog, `상대의 연기에 집중해주세요!`]);
      if (stage !== 'END') {
        handleUserTwoPlay();
      }

      // 내가 유저 2이면서 첫번째 차례
    } else if (mySide === 'USER_TWO' && stage === 'USER_ONE_TURN') {
      setLog((prevLog) => [...prevLog, `상대의 연기에 집중해주세요!`]);
      if (stage !== 'END') {
        handleUserOnePlay();
      }

      // 내가 유저 2이면서 두번째 차례
    } else if (mySide === 'USER_TWO' && stage === 'USER_TWO_TURN') {
      setLog((prevLog) => [...prevLog, `당신 차례입니다. 연기를 준비하세요!!`]);
      if (stage !== 'END') {
        handleUserTwoPlay();
      }

      // 점수 계산
    } else if (stage === 'CALCULATION') {
      setLog((prevLog) => [
        ...prevLog,
        `수고하셨습니다. 점수를 계산하겠습니다.`,
      ]);
      handleCalculateScore();
      setStage('RESULT');

      // 결과 보여주기
    } else if (stage === 'RESULT') {
      // 커튼 닫기

      setLog((prevLog) => [...prevLog, `결과를 확인하세요!`]);
      handleViewResult();

      // 게임 종료
    } else if (stage === 'END') {
      setLog((prevLog) => [...prevLog, `안녕히 가세요!`]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stage]);

  // ############ 턴 종료 ###############
  const [resultScore, setResultScore] = useState(0);

  useEffect(() => {
    if (videoRef.current) {
      const handleEnded = () => {
        // 영화 미리보기 종료
        if (stage === 'WATCHING_MOVIE') {
          setStage('USER_ONE_TURN');
          // 유저1 턴 종료
        } else if (stage === 'USER_ONE_TURN') {
          if (mySide === 'USER_ONE') {
            clearInterval(myInterval);
            const answer = 100 - (sum_diff / frame_cnts) * 100;
            console.log(`@@@@@@@@@@@@@@ 내 점수는 ${answer}`);
            setResultScore(Math.round(answer));
            setRecordOn(false);
          }
          setUserCamLeftBorder(false);
          setUserCamRightBorder(false);
          setStage('USER_TWO_TURN');
          // 유저2 턴 종료
        } else if (stage === 'USER_TWO_TURN') {
          if (mySide === 'USER_TWO') {
            clearInterval(myInterval);
            const answer = 100 - (sum_diff / frame_cnts) * 100;
            console.log(`@@@@@@@@@@@@@@ 내 점수는 ${answer}`);
            setResultScore(Math.round(answer));
            setRecordOn(false);
          }
          setUserCamLeftBorder(false);
          setUserCamRightBorder(false);
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
    setLog((prevLog) => [
      ...prevLog,
      `작품명 : 받아올것 시간 : ${Math.floor(videoRef.current.duration)}초`,
    ]);
    handlePlayVideo(); // 비디오 플레이
    setStage('WATCHING_MOVIE');
  };

  // ############# 유저1 플레이 함수 ##############
  const handleUserOnePlay = async () => {
    await startLoading('count', 5000); // 로딩
    if (mySide === 'USER_ONE') {
      setLog((prevLog) => [...prevLog, `연기를 시작하세요!`]);
    }
    handlePlayVideo();
    if (
      videoRef.current &&
      !videoRef.current.paused &&
      mySide === 'USER_ONE' &&
      stage === 'USER_ONE_TURN'
    ) {
      setRecordOn(true);
      face_detect();
    }
    mySide === 'USER_ONE'
      ? setUserCamLeftBorder(true)
      : setUserCamRightBorder(true);
  };

  // ############# 유저2 플레이 함수 ##############
  const handleUserTwoPlay = async () => {
    await startLoading('count', 5000); // 로딩
    if (mySide === 'USER_TWO') {
      setLog((prevLog) => [...prevLog, `연기를 시작하세요!`]);
    }
    handlePlayVideo();
    if (
      videoRef.current &&
      !videoRef.current.paused &&
      mySide === 'USER_TWO' &&
      stage === 'USER_TWO_TURN'
    ) {
      setRecordOn(true);
      face_detect();
    }
    mySide === 'USER_TWO'
      ? setUserCamLeftBorder(true)
      : setUserCamRightBorder(true);
  };

  // ############# 점수 계산 ##############
  // 유저 식별자도 같이 보내줘야함 (수정!!!!!!!!!!!!!)
  const [userOneName, setUserOneName] = useState(null);
  const [userOneScore, setUserOneScore] = useState(null);
  const [userTwoName, setUserTwoName] = useState(null);
  const [userTwoScore, setUserTwoScore] = useState(null);
  const [resultGame, setResultGame] = useState(0);

  const handleCalculateScore = async () => {
    let newUserOneName = userOneName;
    let newUserOneScore = userOneScore;
    let newUserTwoName = userTwoName;
    let newUserTwoScore = userTwoScore;

    if (mySide === 'USER_ONE') {
      newUserOneName = myUserName;
      newUserOneScore = resultScore;
      console.log('newUserOneScore 값 설정:', newUserOneScore); // 로그
      setUserOneName(newUserOneName);
      setUserOneScore(newUserOneScore);
    } else if (mySide === 'USER_TWO') {
      newUserTwoName = myUserName;
      newUserTwoScore = resultScore;
      setUserTwoName(newUserTwoName);
      setUserTwoScore(newUserTwoScore);
    }

    const dataToSend = {
      userOneName: newUserOneName,
      userOneScore: newUserOneScore,
      userTwoName: newUserTwoName,
      userTwoScore: newUserTwoScore,
    };

    console.log('dataToSend:', dataToSend); // 로그
    await session.signal({
      type: 'score',
      data: JSON.stringify(dataToSend),
      to: [], // 빈 배열은 세션의 모든 클라이언트에게 전송
    });

    // setStage 함수의 정의가 필요합니다.
  };

  useEffect(() => {
    if (session) {
      const onScoreReceived = (e) => {
        const receivedData = JSON.parse(e.data);
        console.log('점수를 받았습니다.');
        setUserOneName(receivedData.userOneName);
        setUserOneScore(receivedData.userOneScore);
        setUserTwoName(receivedData.userTwoName);
        setUserTwoScore(receivedData.userTwoScore);
      };

      session.on('signal:score', onScoreReceived);

      return () => session.off('signal:score', onScoreReceived);
    }
  }, [session]);

  useEffect(() => {
    // 승패결정
    if (mySide === 'USER_ONE') {
      if (userOneScore > userTwoScore) {
        setResultGame(1);
      } else if (userTwoScore > userOneScore) {
        setResultGame(-1);
      } else {
        setResultGame(0);
      }
    }
    if (mySide === 'USER_TWO') {
      if (userOneScore < userTwoScore) {
        setResultGame(1);
      } else if (userTwoScore < userOneScore) {
        setResultGame(-1);
      } else {
        setResultGame(0);
      }
    }
  }, [userOneScore, userTwoScore, mySide]);

  // ############# 결과 보여주기 #############
  const handleViewResult = async () => {
    handleCalculateScore();
    startLoading('lizard', 1000);
    setToggleCurtain(true);
    setStage('END');
  };

  // ############# 녹화 저장 함수 ##############
  const handleSaveVideo = async () => {
    await startLoading('lizard', 1000);
    setLog((prevLog) => [...prevLog, `녹화 영상을 저장했습니다!`]);
  };

  // ############# 모달 ##############
  const [toggleExitModal, setToggleExitModal] = useState(false);
  const [toggleTutorialModal, setToggleTutorialModal] = useState(false);
  const [toggleCurtain, setToggleCurtain] = useState(false);

  return (
    <div className="">
      {session === undefined ? (
        <div id="join">
          <BackStage
            myUserName={myUserName}
            mySessionId={mySessionId}
            joinSession={joinSession}
          />
        </div>
      ) : null}
      {/* 백스테이지 */}

      {session !== undefined ? (
        <div id="session" className="">
          {toggleCurtain && (
            <EndCurtain
              className="fixed inset-0 flex justify-center items-center z-50"
              resultGame={resultGame}
              userOneName={userOneName}
              userOneScore={userOneScore}
              userTwoName={userTwoName}
              userTwoScore={userTwoScore}
              leaveSession={leaveSession}
              session={session}
            />
          )}

          {loadingState.isLoading && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              {loadingState.type === 'lizard' ? (
                <LizardLoading /> // LizardLoading 컴포넌트
              ) : (
                <CountLoading /> // CountLoading 컴포넌트
              )}
            </div>
          )}

          <div id="video-container" className="">
            {/* 배너 */}
            <div className="text-center">
              <img
                src="image/rank/rank-vs.png"
                className="mx-auto h-[200px] w-[300px]"
              />

              <div
                id="log-list"
                className=" h-[60px] mx-4 overflow-auto items-center mb-5 "
              >
                {log.map((item, index) => (
                  <div
                    key={index}
                    ref={logRef}
                    className="log-item text-[36px] text-center z-[52]"
                  >
                    <h1>{item}</h1>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap place-content-center ">
              {publisher !== undefined ? (
                <div onClick={() => handleMainVideoStream(publisher)}>
                  <UserVideoComponent
                    streamManager={publisher}
                    mySide={mySide}
                    recordOn={recordOn}
                    userCamBorder={userCamLeftBorder}
                    type="publisher"
                  />
                </div>
              ) : (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                  <LizardLoading />
                </div>
              )}

              <div
                id="movie-container"
                className="rounded-lg
            flex-col flex justify-evenly"
              >
                <video
                  id="origin"
                  ref={videoRef}
                  src="video/ISawTheDevil.mp4"
                  poster="image/rank/rank-reon.png"
                  className={`mx-4 rounded-lg ${
                    isPlaying ? 'border-4 border-danger' : ''
                  }`}
                  style={{ width: '400px', height: '500px' }}
                />

                <div className="flex justify-center gap-5 mt-10">
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
                    className="m-0 flex items-center justify-center"
                    onClick={() => setToggleTutorialModal(true)}
                  >
                    <img
                      src="image/rank/rank-tutorial-btn.png"
                      alt="tutorial-btn"
                      className="w-[150px] hover:w-[200px] transition-all duration-300"
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
                    className="rounded-lg flex items-center justify-center"
                    onClick={() => setToggleExitModal(true)}
                  >
                    <img
                      src="image/rank/rank-exit-btn.png"
                      alt="exit-btn"
                      className="w-[150px] hover:w-[180px] transition-all duration-300"
                    />
                  </button>
                </div>
                {/* 버튼 */}
              </div>

              {subscribers.length > 0 ? (
                subscribers.map((sub, i) => (
                  <div key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                    <span>{sub.id}</span>
                    <UserVideoComponent
                      streamManager={sub}
                      mySide={null}
                      userCamBorder={userCamRightBorder}
                      type="subscriber"
                    />
                  </div>
                ))
              ) : (
                <div>
                  <div className="flex text-white">
                    <Matching typingContent="..." />
                  </div>
                  <div className="relative flex items-center justify-center w-[500px] h-[400px]">
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
          </div>

          {/* 비디오 */}
        </div>
      ) : // 배틀룸
      null}
    </div>
  );
}
