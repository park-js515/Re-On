import React from "react";
import { Route, Routes } from "react-router-dom";

import BackStagePage from "./pages/BackStagePage";
import FAQPage from "./pages/FAQPage";
import FeedPage from "./pages/FeedPage";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import MyPage from "./pages/MyPage";
import NormalGamePage from "./pages/NormalGamePage";
import NormalListPage from "./pages/NormalListPage";
import RankPage from "./pages/RankPage";
import RegisterPage from "./pages/RegisterPage";

import NavBar from "components/common/NavBar";

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/backstage" element={<BackStagePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/feed" element={<FeedPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/normalgame" element={<NormalGamePage />} />
        <Route path="/normallist" element={<NormalListPage />} />
        <Route path="/rank" element={<RankPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
