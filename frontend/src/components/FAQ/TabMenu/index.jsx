import React, { useState } from "react";
import TabWrapper from "./TabWrapper";
import FAQList from "./FAQList";

const faqData = [
  {
    category: "자주묻는질문",
    title: "이거로 줌으로 해도 되잖아요?",
    content: "줌으로 하세요",
  },
  {
    category: "자주묻는질문",
    title: "이거로 줌으로 해도 되잖아요?",
    content: "줌으로 하세요",
  },
  {
    category: "자주묻는질문",
    title: "이거로 줌으로 해도 되잖아요?",
    content: "줌으로 하세요",
  },
  {
    category: "자주묻는질문",
    title: "이거로 줌으로 해도 되잖아요?",
    content: "줌으로 하세요",
  },
  {
    category: "자주묻는질문",
    title: "SW 경험이 전혀 없는데 지원 가능한가요?",
    content: "SW 전공자뿐만 아니라 비전공자도 지원 가능합니다.",
  },
  {
    category: "화면문제",
    title: "연기 중간에 다른 화면이 나오면 어째요?",
    content: "네",
  },
  {
    category: "점수판정",
    title: "페이지 네이션?",
    content: "반드시",
  },
  {
    category: "점수판정",
    title: "이거 카테3?",
    content: "응",
  },
  {
    category: "회원관련",
    title: "이거 카테4",
    content: "메롱",
  },
];

const TabMenu = () => {
  const [selectedTab, setSelectedTab] = useState("전체");

  return (
    <div>
      <TabWrapper
        setSelectedTab={setSelectedTab}
        faqData={faqData}
        selectedTab={selectedTab}
      />
      <FAQList selectedTab={selectedTab} faqData={faqData} />
    </div>
  );
};

export default TabMenu;
