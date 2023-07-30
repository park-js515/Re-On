import { useEffect } from "react";

const usePreventLeave = () => {
  const listener = (event) => {
    event.preventDefault();
    event.returnValue = "";
  };
  const enablePrevent = () => window.addEventListener("beforeunload", listener);
  const disablePrevent = () => window.removeEventListener("beforeunload", listener);

  useEffect(() => {
    enablePrevent();
    return () => {
      disablePrevent();
    };
  }, []);

  return { enablePrevent, disablePrevent };
};

export default usePreventLeave;
