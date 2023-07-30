import { useTabs } from "./hooks";
import * as Tab from "./Tabs/index";
import * as FeedList from "./FeedList";
import * as Sty from "./style";

const contents = ["Public", "Private", "Like", "Uploaded"];

const MyFeed = () => {
  const { currentTab, changeTab } = useTabs(0, contents);
  const scrollTop = () => {window.scroll({ top: 0, left: 0, behavior: "smooth" })};

  return (
    <Sty.SRoww100>
      <Sty.SColTab>
        <Sty.SBottom>
          {contents.map((tab, index) => {
            return (
              <Tab.TabButton
                key={index}
                selected={currentTab === tab}
                onClick={() => {
                  scrollTop();
                  changeTab(index);
                }}
              >
                {tab}
              </Tab.TabButton>
            );
          })}
        </Sty.SBottom>
      </Sty.SColTab>

      <Sty.SColFeedList>
        {contents.map((tab, index) => {
          return (
            <Tab.TabContent key={index} isActive={currentTab === tab}>
              <FeedList.FeedList tabNum={index}></FeedList.FeedList>
            </Tab.TabContent>
          );
        })}
      </Sty.SColFeedList>
    </Sty.SRoww100>
  );
};

export { MyFeed };
