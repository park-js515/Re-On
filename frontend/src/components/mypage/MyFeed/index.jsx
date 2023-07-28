import { useTabs } from "./hooks";
import * as Tab from "./Tabs/index";
import * as Sty from "./style";

const contents = ["Public", "Private", "Like", "Uploaded"];

const MyFeed = () => {
  const { currentTab, changeTab } = useTabs(0, contents);

  return (
    <Sty.SRoww100>
      <Sty.SColTab>
        {contents.map((tab, index) => {
          return (
            <Tab.TabButton
              key={index}
              selected={currentTab === tab}
              onClick={() => changeTab(index)}
            >
              {tab}
            </Tab.TabButton>
          );
        })}
      </Sty.SColTab>

      <Sty.SColFeedList>
        {contents.map((tab, index) => {
          return (
            <Tab.TabContent key={index} isActive={currentTab === tab}>
              {tab}
            </Tab.TabContent>
          );
        })}
      </Sty.SColFeedList>
    </Sty.SRoww100>
  );
};

export { MyFeed };
