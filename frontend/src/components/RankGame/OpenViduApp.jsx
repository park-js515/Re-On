/* eslint-disable jsx-a11y/alt-text */
import { OpenVidu } from 'openvidu-browser';
import './OpenVidu.css';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import BackStage from './BackStage';
import UserVideoComponent from './UserVideoComponent';
import Matching from 'components/Typing/Matching';
import LoadingWaiting from 'components/RankGame/LoadingWaiting';
import MatchingWaiting from 'components/RankGame/MatchingWaiting';
import CalculatingWaiting from 'components/RankGame/CalculatingWaiting';
import Modal from 'components/RankGame/Modal';
import TutorialModal from 'components/RankGame/TutorialModal';
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
  const [mySession, setMySession] = useState(null); // 밖에서 세션 시그널을 사용하기 위함

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
      setLog((prevLog) => [
        ...prevLog,
        `${logMessageTime} | 당신은 ${me}입니다.`,
      ]);
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
      setLog((prevLog) => [
        ...prevLog,
        `${logMessageTime} | 게임을 시작합니다.`,
      ]);
      await startLoading(5000); // 로딩 5초
      handleLoadVideo(); // 영상 시작
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });

    setSession(mySession);

    dispatch(setIsJoinSession(true));
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 참가했습니다.`]);
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

  // 테스트 요청
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
      const response = await axios.post(
        APPLICATION_SERVER_URL + '/api/openvidu-management/test',
        { customSessionId: sessionId },
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

  // 작업중인 요청
  // const getToken = useCallback(async () => {
  //   return createToken().then((response) => {
  //     // const url = new URL(response);
  //     // const sessionId = url.searchParams.get('sessinId');
  //     // const token = url.searchParams.get('token');
  //     const tmp =
  //       'wss://i9c203.p.ssafy.io?sessionId=ses_OYSe2KtSh5&token=tok_OrWnXOs2EmioDSXR';
  //     return tmp;
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  // const createToken = async () => {
  //   try {
  //     const response = await axios.post(
  //       APPLICATION_SERVER_URL + '/api/openvidu-management/test',
  //       {}, // body
  //       {
  //         headers: {
  //           Authorization: 'Basic T1BFTlZJRFVBUFA6b3BlbnZpZHVyZW9uYzIwMw==',
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
    const canvas = faceapi.createCanvasFromMedia(video);

    origin.addEventListener('loadeddata', () => {
      const origin_canvas = faceapi.createCanvasFromMedia(origin);
      faceapi.matchDimensions(origin_canvas, originSize);
    });

    const originSize = { width: 224, height: 224 };
    const videoSize = { width: 224, height: 224 };
    faceapi.matchDimensions(canvas, videoSize);
    const FPS = 10;
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
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 작품 미리보기`]);

      // 내가 유저 1이면서 첫번째 차례
    } else if (mySide === 'USER_ONE' && stage === 'USER_ONE_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 내 연기 시작`]);
      handleUserOnePlay();
      // 내가 유저 1이면서 두번째 차례
    } else if (mySide === 'USER_ONE' && stage === 'USER_TWO_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 상대 연기 시작`]);
      handleUserTwoPlay();

      // 내가 유저 2이면서 첫번째 차례
    } else if (mySide === 'USER_TWO' && stage === 'USER_ONE_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 상대 연기 시작`]);
      handleUserOnePlay();

      // 내가 유저 2이면서 두번째 차례
    } else if (mySide === 'USER_TWO' && stage === 'USER_TWO_TURN') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 내 연기 시작`]);
      handleUserTwoPlay();
      // 점수 계산
    } else if (stage === 'CALCULATION') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 계산 시작`]);
      handleCaculateScore();

      // 결과 보여주기
    } else if (stage === 'RESULT') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 결과 종료`]);
      handleViewResult();

      // 게임 종료
    } else if (stage === 'END') {
      setLog((prevLog) => [...prevLog, `${logMessageTime} | 게임 종료`]);
      setToggleSaveModal(true);
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
          if (mySide === 'USER_ONE') {
            clearInterval(myInterval);
            const answer = 100 - (sum_diff / frame_cnts) * 100;
            console.log(`@@@@@@@@@@@@@@ 내 점수는 ${answer}`);
            setResultScore(answer);
            setRecordOn(false);
          }
          setUserCamLeftBorder(false);
          setUserCamRightBorder(false);
          setStage('USER_TWO_TURN');
          // 유저2 턴 종료
        } else if (stage === 'USER_TWO_TURN') {
          setLog((prevLog) => [
            ...prevLog,
            `${logMessageTime} | 두번째 연기 종료`,
          ]);
          if (mySide === 'USER_TWO') {
            clearInterval(myInterval);
            const answer = 100 - (sum_diff / frame_cnts) * 100;
            console.log(`@@@@@@@@@@@@@@ 내 점수는 ${answer}`);
            setResultScore(answer);
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
    handlePlayVideo();
    if (
      videoRef.current &&
      !videoRef.current.paused &&
      mySide === 'USER_ONE' &&
      stage === 'USER_ONE_TURN'
    ) {
      setRecordOn(true);
      face_detect();
      // handleRecordVideo();
    }
    mySide === 'USER_ONE'
      ? setUserCamLeftBorder(true)
      : setUserCamRightBorder(true);
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 1 시작`]);
  };

  // ############# 유저2 플레이 함수 ##############
  const handleUserTwoPlay = async () => {
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 대기`]);
    await startLoading(3000); // 로딩
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
    setLog((prevLog) => [...prevLog, `${logMessageTime} | 유저 2 시작`]);
  };

  // ############# 점수 계산 ##############
  // 실제 이곳에서 계산하는 게 아니라
  const handleCaculateScore = async () => {
    //  AI계산
    setLog((prevLog) => [...prevLog, `${logMessageTime} | AI 점수 계산`]);
    //  점수를 계산한다면,,,,,,
    // 상대에게 점수랑 id 보내는 시그널
    // 점수, id 받기

    // 점수 비교해서 승 무 패 결정

    // 내 ID. 상대ID. 승무패 보내는 API

    setStage('RESULT');
    // AI 계산하는 로직
    await startLoading(3000);
  };

  // ############# 결과 보여주기 #############
  const handleViewResult = async () => {
    // 커튼 촤라라라락 결과 보여주는
    await startLoading(3000);

    setStage('END');
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
          {toggleSaveModal && (
            <Modal
              type="save"
              onConfirm={handleSaveVideo}
              isOpen={toggleSaveModal}
              onClose={() => setToggleSaveModal(false)}
            />
          )}

          {isLoading && (
            <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
              <LoadingWaiting />
            </div>
          )}

          <div id="video-container" className="">
            <div className="text-center">
              <img
                src="image/rank/rank-vs.png"
                className="mx-auto h-[200px] w-[300px]"
              />

              <div
                id="log-list"
                className=" h-[40px] mx-4 overflow-auto items-center mb-5"
              >
                {log.map((item, index) => (
                  <div
                    key={index}
                    ref={logRef}
                    className="log-item text-[24px] text-center"
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
                  />
                </div>
              ) : (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                  <LoadingWaiting />
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
                  src="video/아저씨-원빈-금니빨.mp4"
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

              {stage === 'END' && (
                <div className="fixed inset-0 flex justify-center items-center z-50">
                  {resultScore}
                </div>
              )}

              {subscribers.length > 0 ? (
                subscribers.map((sub, i) => (
                  <div key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                    <span>{sub.id}</span>
                    <UserVideoComponent
                      streamManager={sub}
                      mySide={null}
                      userCamBorder={userCamRightBorder}
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
