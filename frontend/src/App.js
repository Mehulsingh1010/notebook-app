import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Info from "./components/Info";
import "./index.css"
// import NoteState from "./context/notes/NoteState";
const App = () => {
  return (
    <div>
      {/* <NoteState> */}
        <Router>
          <Navbar />
          <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/Info" element={<Info />} />
          </Routes>
          </div>
        </Router>
      {/* </NoteState> */}
    </div>
  );
};

export default App;
