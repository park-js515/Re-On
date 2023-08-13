import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';

/**
 * @returns {string} transcript (인식한 텍스트)
 * @returns {boolean} listening(녹음 중인가?)
 * @returns {function} startListening (녹음 시작)
 * @returns {function} stopListening (녹음 정지)
 */
const useSpeechToText = () => {
  const {
    transcript,
    resetTranscript,
    listening,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    alert('지원되지 않는 브라우저입니다!');
    return;
  }

  const startListening = () => {
    SpeechRecognition.startListening({ language: 'ko-KR', continuous: true });
  };

  const stopListening = () => {
    SpeechRecognition.stopListening();
  };

  return {
    transcript,
    resetTranscript,
    listening,
    startListening,
    stopListening,
  };
};

export default useSpeechToText;
