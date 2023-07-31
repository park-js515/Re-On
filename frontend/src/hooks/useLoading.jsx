// useLoading.js
import { useState, useEffect } from "react";

const useLoading = (initialState, duration) => {
  const [isLoading, setLoading] = useState(initialState);

  const startLoading = (durationOverride = duration) => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoading(false);
        resolve();
      }, durationOverride);
    });
  };

  return { isLoading, startLoading };
};

export default useLoading;
