// import React from "react";
// import { useEffect, useRef } from "react";
// import { OpenVidu } from "openvidu-browser";

// const UserVideo = () => {
//   const videoRef = useRef();

//   useEffect(() => {
//     const OV = new OpenVidu();
//     const session = OV.initSession();

//     session.on("streamCreated", (event) => {
//       const subscriber = session.subscribe(event.stream, videoRef.current.id);
//       subscriber.on("videoElementCreated", (event) => {
//         videoRef.current.appendChild(event.element);
//       });
//     });

//     const publisher = OV.initPublisher(videoRef.current.id, {
//       audioSource: undefined,
//       videoSource: undefined,
//       publishAudio: true,
//       publishVideo: true,
//       resolution: "300x300",
//       frameRate: 15,
//       insertMode: "APPEND",
//       mirror: true,
//     });

//     const TOKEN = "YOUR_OPENVIDU_TOKEN"; // Replace this with your actual OpenVidu token

//     session
//       .connect(TOKEN)
//       .then(() => {
//         session.publish(publisher);
//       })
//       .catch((error) => {
//         console.error(
//           "There was an error connecting to the session:",
//           error.code,
//           error.message,
//         );
//       });
//   }, []);

//   return <div id="video-container" ref={videoRef} />;
// };

// export default UserVideo;
