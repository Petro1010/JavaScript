import React from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import HomePage from "./components/HomePage";
import HistoryPage from "./components/HistoryPage";
import StadiumPage from "./components/StadiumPage";
import TeamPage from "./components/TeamPage";
import ErrorPage from "./components/ErrorPage";


function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/history" element={<HistoryPage />}/>
        <Route path="/team" element={<TeamPage />}/>
        <Route path="/stadium" element={<StadiumPage />}/>
        <Route path="*" element={<ErrorPage />}/>
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
