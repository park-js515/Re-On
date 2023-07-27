import { useState } from "react";
import * as Tab from "./Tabs/index";

const contents = ["Public", "Private", "Like", "Uploaded"];

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

const MyFeed = () => {
  const { currentTab, changeTab } = useTabs(0, contents);

  return (
    <>
      {contents.map((tab, index) => {
        return (
          <div key={index}>
            <Tab.TabButton
              isActive={() => {return currentTab === index}}
              onClick={() => {
                changeTab(index);
              }}
            >
              {tab}
            </Tab.TabButton>
            <Tab.TabContent isActive={index === currentTab}>
              {tab}
            </Tab.TabContent>
          </div>
        );
      })}
    </>
  );
};

export { MyFeed };
