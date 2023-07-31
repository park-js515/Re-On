import * as hooks from "./hooks";
import * as Tab from "./Tab";
import * as FeedList from "./FeedList";
import * as Sty from "./style";

const contents = ["Public", "Private", "Like", "Uploaded"];

const Feed = () => {
  const { currentTab, changeTab } = hooks.useTabs(0, contents);
  const scrollTop = () => {
    window.scroll({ top: 0, left: 0, behavior: "smooth" });
  };

  return (
    <>
      <Sty.Roww100>
        <Sty.ColTab>
          <Sty.Bottom>
            {contents.map((tab, index) => {
              return (
                <Tab.TabButton
                  key={index}
                  selected={currentTab === tab}
                  onClick={() => {
                    scrollTop();
                    changeTab(index);
                  }}
                >{tab}</Tab.TabButton>
              );
            })}
          </Sty.Bottom>
        </Sty.ColTab>

        <Sty.ColFeedList>
          {contents.map((tab, index) => {
            return (
              <Tab.TabContent key={index} isActive={currentTab === tab}>
                <FeedList.FeedList tabNum={index}></FeedList.FeedList>
              </Tab.TabContent>
            );
          })}
        </Sty.ColFeedList>
      </Sty.Roww100>
    </>
  );
};

export { Feed };
