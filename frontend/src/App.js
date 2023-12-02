import React from "react";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Home from "./components/Home";
import Login from "./components/login";
import Ajout from "./components/AjoutMatiere";

import StudentGradesTable from "./components/StudentGradesTable";

import './App.css';

function App() {
  const user = localStorage.getItem("token");

  return (
    <Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Ajout" element={<Ajout />} />
          <Route path="/register" element={<Register />} />
          <Route path="/grades" element={<StudentGradesTable />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
