import { React, useState, useEffect, useRef } from 'react';
import * as faceapi from 'face-api.js';
import './Solo.css';
import { randomVideo } from 'apiList/video';

const SoloApp = () => {
  const ort = require('onnxruntime-web/webgpu');

  //연기끝난지 아는거

  // ※ 이거 바꾸시려면 Solo.css도 바꾸셔야 합니다. //
  const video_width = 500; //
  const video_height = 500; //
  ///////////////////////////
  const base_url = 'https://storage.googleapis.com/reon-bucket/';
  const [reload, setReload] = useState(false);
  const videoRef = useRef();
  const webCamRef = useRef();
  const [answer, setAnswer] = useState(-1);
  const [url, setUrl] = useState('');
  const [script, setScript] = useState('');
  const getURL = () => {
    randomVideo(
      (response) => {
        const newdata = response.data.response;
        console.log(newdata);
        setUrl(base_url + newdata.videoPath);
        setScript(newdata.script);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const [ortSession, setOrtSession] = useState(null);

  useEffect(() => {
    async function createSession() {
      try {
        // const newSession = await ort.InferenceSession.create('reon_model-2.onnx', {executionProviders: ['webgl']});
        // setOrtSession(newSession);

        await setOrtSession(
          await ort.InferenceSession.create('reon_model-2.onnx', {
            executionProviders: ['webgl'],
          }),
        );
        await faceapi.nets.tinyFaceDetector.loadFromUri('models');
        console.log('ONNX, Face-API 로딩 완료');
        if (navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
              webCamRef.current.srcObject = stream;
            })
            .catch((error) => {
              console.log(error);
            });
        }
      } catch (e) {
        document.write(`failed to inference ONNX model: ${e}.`);
      }
    }

    getURL();
    createSession();
    return () => {
      setOrtSession(null);
      faceapi.tf.dispose();
      console.log('전부 삭제');
    };
  }, []);

  useEffect(() => {
    if (videoRef.current) {
      const handleEnded = () => {
        clearInterval(detectInterval);
        while (document.getElementsByTagName('canvas').length > 0) {
          document.getElementsByTagName('canvas')[0].remove();
        }
        videoRef.current.currentTime = 0;
        setReload((reload) => {
          return !reload;
        });
        setAnswer(frame_cnts === 0 ? 0 : 100 - (sum_diff / frame_cnts) * 100);
        sum_diff = 0;
        frame_cnts = 0;
      };
      const handlePlay = () => {
        setAnswer(-1);
        face_detect();
      };

      videoRef.current.addEventListener('ended', handleEnded);
      videoRef.current.addEventListener('play', handlePlay);

      return () => {
        clearInterval(detectInterval);
        while (document.getElementsByTagName('canvas').length > 0) {
          document.getElementsByTagName('canvas')[0].remove();
        }
        if (videoRef.current) {
          videoRef.current.removeEventListener('ended', handleEnded);
          videoRef.current.removeEventListener('play', handlePlay);
        }
      };
    }
  }, [videoRef, ortSession]);

  ///////////////////////////////////////// 초롱이 시작 ////////////////////////////////////////////////
  let detectInterval = null; ///
  let frame_cnts = 0; ///
  let sum_diff = 0;

  function face_detect() {
    const video1 = webCamRef.current;
    const video2 = videoRef.current;
    const canvas1 = faceapi.createCanvasFromMedia(video1);
    const canvas2 = faceapi.createCanvasFromMedia(video2);
    const displaySize = { width: video_width, height: video_height };
    faceapi.matchDimensions(canvas1, displaySize);
    faceapi.matchDimensions(canvas2, displaySize);
    video1.parentElement.append(canvas1);
    video2.parentElement.append(canvas2);
    const FPS = 10;
    detectInterval = setInterval(async () => {
      const detections1 = await faceapi.detectAllFaces(
        video1,
        new faceapi.TinyFaceDetectorOptions(),
      );
      const detections2 = await faceapi.detectAllFaces(
        video2,
        new faceapi.TinyFaceDetectorOptions(),
      );
      const resizedDetections1 = faceapi.resizeResults(
        detections1,
        displaySize,
      );
      const resizedDetections2 = faceapi.resizeResults(
        detections2,
        displaySize,
      );
      canvas1.getContext('2d').clearRect(0, 0, canvas1.width, canvas1.height);
      canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height);
      faceapi.draw.drawDetections(canvas1, resizedDetections1);
      faceapi.draw.drawDetections(canvas2, resizedDetections2);
      if (detections1.length > 0 && detections2.length > 0) {
        try {
          await image_classification(detections1[0].box, detections2[0].box);
        } catch (err) {
          console.log(err);
        }
      }
    }, 1000 / FPS);
  }

  async function image_classification(box1, box2) {
    if (!ortSession == null) {
      console.log('널.');
      return;
    }

    const [x1, y1, w1, h1] = [box1.x, box1.y, box1.width, box1.height];
    const [x2, y2, w2, h2] = [box2.x, box2.y, box2.width, box2.height];
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];
    const imageData1 = resizeImage(x1, y1, w1, h1, webCamRef.current);
    const imageData2 = resizeImage(x2, y2, w2, h2, videoRef.current);

    // Create a new Float32Array for the input tensor
    const inputData1 = new Float32Array(1 * 3 * 224 * 224);
    const inputData2 = new Float32Array(1 * 3 * 224 * 224);
    const pixels = 224 * 224;

    // 데이터 정규화
    for (let i = 0; i < pixels; i++) {
      inputData1[i * 3] = (imageData1.data[i * 4] / 255 - mean[0]) / std[0]; // R
      inputData1[i * 3 + 1] =
        (imageData1.data[i * 4 + 1] / 255 - mean[1]) / std[1]; // G
      inputData1[i * 3 + 2] =
        (imageData1.data[i * 4 + 2] / 255 - mean[2]) / std[2]; // B
      inputData2[i * 3] = (imageData2.data[i * 4] / 255 - mean[0]) / std[0]; // R
      inputData2[i * 3 + 1] =
        (imageData2.data[i * 4 + 1] / 255 - mean[1]) / std[1]; // G
      inputData2[i * 3 + 2] =
        (imageData2.data[i * 4 + 2] / 255 - mean[2]) / std[2]; // B
    }

    // Create ONNX tensor from the input array
    const inputTensor1 = new ort.Tensor(
      'float32',
      inputData1,
      [1, 3, 224, 224],
    );
    console.log(inputTensor1);
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

  function resizeImage(x, y, w, h, video) {
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = 224;
    cropCanvas.height = 224;
    const cropContext = cropCanvas.getContext('2d');

    cropContext.drawImage(video, x, y, w, h, 0, 0, 224, 224);
    return cropContext.getImageData(0, 0, 224, 224); ///
  } ///
  //////////////////////////////////// 초롱이 끝 ////////////////////////////////////////////

  function startActing() {
    if (reload) {
      videoRef.current.currentTime = videoRef.current.duration;
    } else {
      const video = videoRef.current;
      video.play();
      setReload(!reload);
    }
  }

  function getScoreText(score) {
    if (score >= 90) return `배우 할생각없어? ${answer.toFixed(0)}점`;
    if (score >= 70) return `인상적인 연기! ${answer.toFixed(0)}점`;
    if (score >= 50) return `안정적인 연기! ${answer.toFixed(0)}점`;
    if (score >= 30) return `노력이 필요해! ${answer.toFixed(0)}점`;
    if (score >= 10) return `더욱 연습해봐! ${answer.toFixed(0)}점`;
    if (score >= 0) return `이게 연기야!? ${answer.toFixed(0)}점`;

    return `내가 평가해줄게!`;
  }

  return (
    <div className="-mt-16 py-8">
      <img
        src="image/solo/solo.png"
        className="mx-auto h-[200px] w-[300px] mt-2"
        alt="Solo"
      />
      <div className="flex flex-row items-center justify-around ">
        <div className="flex flex-row items-center justify-around mt-9">
          <div id="webCam_container">
            <video
              id="movie"
              autoPlay
              style={{ width: '500px', height: '500px' }}
              className="rounded-lg"
              ref={webCamRef}
            ></video>
          </div>

          <div className="flex flex-col justify-center items-center my-4 mx-16 mb-10 space-y-4">
            {/* 점수 */}
            {typeof answer !== 'undefined' && (
              <div className="score-animation mt-4 text-black font-extrabold text-xl px-8 py-4 rounded-lg shadow-xl flex items-center justify-center ">
                <span>{getScoreText(answer.toFixed(0))} </span>
              </div>
            )}
            <img
              className="h-[190px] w-[280px]"
              src="/image/character/cutereon2.png"
              alt=""
            />

            <div className="flex">
              {/* 영화 바꾸기 버튼 */}
              <button
                onClick={getURL}
                disabled={reload ? true : false}
                className="bg-[#9ac8cc] text-white font-extrabold text-md px-5 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 hover:bg-[#8ccfd5] shadow-2xl hover:shadow-3xl focus:outline-none "
              >
                🎲영화변경
              </button>

              {/* 재시작 버튼 */}
              <button
                onClick={startActing}
                disabled={
                  ortSession && webCamRef.current && videoRef.current
                    ? false
                    : true
                }
                className={`ml-2 text-white font-extrabold text-md px-5 py-3 rounded-full transform transition-transform duration-300 hover:scale-105 shadow-2xl hover:shadow-3xl focus:outline-none ${
                  reload
                    ? 'bg-[#f2a475] hover:bg-[#e99364]'
                    : 'bg-[#e17389] hover:bg-[#ba5368]'
                }`}
              >
                {reload ? '🎬다시하기' : '🎮게임시작'}
              </button>
            </div>

            {/* 대사 자막 */}
            <div className="w-[280px] h-[150px] rounded bg-white text-center">
              <span className="w-[280px]">📜대사</span>
              <br />
              <div className="break-words">
                {script ? script : '표정에만 집중해요!'}
              </div>
            </div>
          </div>

          <div id="movie_container">
            <video
              id="movie"
              src={url ? url : null}
              style={{ width: '500px', height: '500px' }}
              className="rounded-lg"
              ref={videoRef}
              crossOrigin="annoymous"
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoloApp;
