import React, { useState, useEffect } from "react";

const NoramalListPage = () => {
  const [isListening, setIsListening] = useState(false);
  const [note, setNote] = useState("");
  const [speechRecognition, setSpeechRecognition] = useState(null);

  useEffect(() => {
    if (window.webkitSpeechRecognition) {
      const recognition = new window.webkitSpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");
        setNote(transcript);
        recognition.onerror = (event) => {
          console.error("Speech Recognition Error", event);
        };
      };
      setSpeechRecognition(recognition);
    }
  }, []);

  const startListening = () => {
    if (speechRecognition) {
      speechRecognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (speechRecognition) {
      speechRecognition.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-inss p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Voice Recognition</h2>
        <div className="flex justify-center mb-4">
          {isListening ? (
            <button
              onClick={stopListening}
              className="px-4 py-2 bg-danger text-black rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50"
            >
              Stop
            </button>
          ) : (
            <button
              onClick={startListening}
              className="px-4 py-2 bg-mainBlue text-black rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
            >
              Start
            </button>
          )}
        </div>
        <div className="border-t pt-4">
          <p className="text-gray-600">{note}</p>
        </div>
      </div>
    </div>
  );
};

export default NoramalListPage;
