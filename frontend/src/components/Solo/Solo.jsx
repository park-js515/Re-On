import {React, useState, useEffect, useRef } from "react";
import * as faceapi from 'face-api.js'
import './Solo.css'
const ort = require('onnxruntime-web/webgpu')

const SoloApp = ({video_url}) => {
  const [ortSession, setOrtSession] = useState(null);
  const video_width = 500;
  const video_height = 400;
  const [reload, setReload] = useState(false);
  useEffect(()=>{
    async function createSession(){
      try {
        await setOrtSession(await ort.InferenceSession.create('reon_model-2.onnx', {executionProviders: ['webgl']}));
        await faceapi.nets.tinyFaceDetector.loadFromUri('models');
        
        // OpenVidu 안쓰고 합니다.
        const video = document.getElementById('webCam')
        if (navigator.mediaDevices.getUserMedia){
          navigator.mediaDevices.getUserMedia({video:true})
          .then((stream)=>{
            video.srcObject = stream
          })
          .catch((error)=>{
            console.log(error)
          })
        }

      }
      catch (e) {
        document.write(`failed to inference ONNX model: ${e}.`)
      }
    };
    createSession();
    console.log("etest")
    setTimeout(()=>{})
    return ()=>{setOrtSession(null)}
  },[])

  /////////////////////////// 만지면 안되는 부분 //////////////////////////////////
  let detectInterval = null;
  function face_detect() {
    const video1 = document.getElementById("webCam");
    const video2 = document.getElementById("movie");
    const canvas1 = faceapi.createCanvasFromMedia(video1);
    const canvas2 = faceapi.createCanvasFromMedia(video2);
    const displaySize = { width: video_width, height: video_height };
    faceapi.matchDimensions(canvas1, displaySize);
    faceapi.matchDimensions(canvas2, displaySize);
    video1.parentElement.append(canvas1)
    video2.parentElement.append(canvas2)
    const FPS = 10;
    detectInterval = setInterval(async () => {
      const detections1 = await faceapi.detectAllFaces(video1, new faceapi.TinyFaceDetectorOptions());
      const detections2 = await faceapi.detectAllFaces(video2, new faceapi.TinyFaceDetectorOptions());
      const resizedDetections1 = faceapi.resizeResults(detections1, displaySize);
      const resizedDetections2 = faceapi.resizeResults(detections2, displaySize);
      canvas1.getContext('2d').clearRect(0, 0, canvas1.width, canvas1.height);
      canvas2.getContext('2d').clearRect(0, 0, canvas2.width, canvas2.height);
      faceapi.draw.drawDetections(canvas1, resizedDetections1);
      faceapi.draw.drawDetections(canvas2, resizedDetections2);
      if (resizedDetections1.length > 0 && resizedDetections2.length > 0) {
        try{
          await image_classification(resizedDetections1[0].box, resizedDetections2[0].box);
        }
        catch(err){
          console.log(err)
        }
      }
    }, 1000 / FPS)
  }
  
  async function image_classification(box1, box2) {

    const [x1, y1, w1, h1] = [box1.x, box1.y, box1.width, box1.height];
    const [x2, y2, w2, h2] = [box2.x, box2.y, box2.width, box2.height];
    const mean = [0.485, 0.456, 0.406];
    const std = [0.229, 0.224, 0.225];
    const imageData1 = resizeImage(x1,y1,w1,h1,"webCam")
    const imageData2 = resizeImage(x2,y2,w2,h2,"movie")


    // Create a new Float32Array for the input tensor
    const inputData1 = new Float32Array(1 * 3 * 224 * 224);
    const inputData2 = new Float32Array(1 * 3 * 224 * 224);
    const pixels = 224 * 224;

    // 데이터 정규화
    for (let i = 0; i < pixels; i++) {
      inputData1[i * 3] = (imageData1.data[i * 4] / 255.0 - mean[0]) / std[0]; // R
      inputData1[i * 3 + 1] = (imageData1.data[i * 4 + 1] / 255.0 - mean[1]) / std[1]; // G
      inputData1[i * 3 + 2] = (imageData1.data[i * 4 + 2] / 255.0 - mean[2]) / std[2]; // B
      inputData2[i * 3] = (imageData2.data[i * 4] / 255.0 - mean[0]) / std[0]; // R
      inputData2[i * 3 + 1] = (imageData2.data[i * 4 + 1] / 255.0 - mean[1]) / std[1]; // G
      inputData2[i * 3 + 2] = (imageData2.data[i * 4 + 2] / 255.0 - mean[2]) / std[2]; // B
      // 투명도는 건너뛰기
    }

    // Create ONNX tensor from the input array
    const inputTensor1 = new ort.Tensor('float32', inputData1, [1, 3, 224, 224]);
    const inputTensor2 = new ort.Tensor('float32', inputData2, [1, 3, 224, 224]);
    const inputName = ortSession.inputNames[0];
    const outputName = ortSession.outputNames[0];
    const input1 = { [inputName]: inputTensor1 };
    const input2 = { [inputName]: inputTensor2 };
    const output1 = await ortSession.run(input1);
    const output2 = await ortSession.run(input2);
    let probs1 = output1[outputName].data
    let probs2 = output2[outputName].data
    // console.log(probs1)
    // console.log(probs2)
    // console.log("==========================")
  }

  function resizeImage(x,y,w,h,id) {
    const video = document.getElementById(id)
    const cropCanvas = document.createElement('canvas');
    cropCanvas.width = 224;
    cropCanvas.height = 224;
    const cropContext = cropCanvas.getContext('2d');

    cropContext.drawImage(video, x, y, w, h, 0, 0, 224, 224);
    return cropContext.getImageData(0, 0, 224, 224);
  }
  /////////////////////////// 만지면 안되는 부분 //////////////////////////////////

  function startActing () {
    if (reload){
      clearInterval(detectInterval)
      document.getElementsByTagName('canvas')[0].remove()
      document.getElementsByTagName('canvas')[0].remove()
      return;
    }
    const video = document.getElementById('movie')
    video.play()
    setReload(!reload)
  }

  return (
    <div>

      <div className="flex flex-row items-center justify-around">

          <div id="webCam_container">
              <video id="webCam"
                autoPlay
                style={{ width: '500px', height: '400px' }}
                className="rounded-lg"
              >
              </video>
          </div>

          <button 
            className="outline text-sm"
            onClick={startActing}
          >
            {reload ? "RESTART" : "START"}
          </button>

          <div id="movie_container">

              <video id="movie"
                src={video_url}
                style={{ width: '500px', height: '400px' }}
                onPlay={face_detect}
                onEnded={()=>{
                  clearInterval(detectInterval)
                  document.getElementsByTagName('canvas')[0].remove()
                  document.getElementsByTagName('canvas')[0].remove()
                }}
                className="rounded-lg"
              >
              </video>
          </div>

      </div>
    </div>
  )
}

export default SoloApp;