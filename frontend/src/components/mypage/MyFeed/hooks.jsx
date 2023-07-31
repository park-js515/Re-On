import { useState } from "react";

const useTabs = (initialTab, allTabs) => {
  const [currentIndex, setCurrentIndex] = useState(initialTab);

  if (!allTabs || !Array.isArray(allTabs)) {
    return;
  }

  return {
    currentTab: allTabs[currentIndex],
    changeTab: setCurrentIndex,
  };
};

export { useTabs };
