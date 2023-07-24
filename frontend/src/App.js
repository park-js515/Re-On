import React from "react";
import { Route, Routes } from "react-router-dom";
import RankPage from "./pages/Rank/RankPage";
import MainPage from "./pages/MainPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/rank" element={<RankPage />} />
    </Routes>
  );
}

export default App;
