// useLoading.js
import { useState, useEffect } from 'react';

const useLoading = (
  initialState = { isLoading: false, type: 'count' },
  duration,
) => {
  const [loadingState, setLoadingState] = useState(initialState);

  const startLoading = (type, durationOverride = duration) => {
    setLoadingState({ isLoading: true, type });
    return new Promise((resolve) => {
      setTimeout(() => {
        setLoadingState({ isLoading: false, type: 'count' }); // 초기 상태로 돌아가거나 다른 로직을 추가할 수 있습니다.
        resolve();
      }, durationOverride);
    });
  };

  return { loadingState, startLoading };
};

export default useLoading;
