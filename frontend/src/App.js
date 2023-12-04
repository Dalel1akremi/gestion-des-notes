import React from "react";
import { Fragment } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import RegisterEns from "./components/RegistreEns";
import Home from "./components/Home";
import Login from "./components/login";
import AjoutMatiere from "./components/AjoutMatiere";
import Affichematiere from "./components/Affichematiere";
import EditMatiere from "./components/ModifMatiere";
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
          <Route path="/AjoutMatiere" element={<AjoutMatiere />} />
          <Route path="/EditMatiere" element={<EditMatiere />} />
          <Route path="/Affichematiere" element={<Affichematiere />} />
          <Route path="/register" element={<Register />} />
          <Route path="/registerEns" element={<RegisterEns />} />
          <Route path="/grades" element={<StudentGradesTable />} />
          {/* Add more routes as needed */}
        </Routes>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
