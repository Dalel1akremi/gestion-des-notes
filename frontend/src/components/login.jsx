import React, { useState } from "react";
import axios from "axios";
import "./login.css";
import { jwtDecode } from "jwt-decode";
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');

  const Auth = async (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/login", {
      email: email,
      password: password
    }).then(({ data }) => {
      const token = data.token;

      if (token) {
        localStorage.setItem("token", token);
        const decodedToken = jwtDecode(token); 
               if (decodedToken.userType === 'student') {
          window.location = "/DashbordStudent";
        } else if (decodedToken.userType === 'teacher') {
          window.location = "/Affichematiere";
        } else if (decodedToken.userType === 'admin') {
          window.location = "/DashbordAdmin";}
      } else {
        setMsg("Mot de passe ou email incorrect");
      }
    }).catch(error => {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.msg === "User not found"
      ) {
        setMsg("Email incorrect"); 
      } else if (
        error.response &&
        error.response.status === 401 &&
        error.response.data.msg === "Invalid credentials"
      ) {
        setMsg("Mot de passe incorrect"); 
      } else if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setMsg(error.response.data.msg);
      }
    });
  };
   return (
    <div className="page">
      <div className="container">
        <div className="left">
          <div className="login">Bienvenue</div>
          <div className="eula">Bienvenue sur notre plateforme de gestion des notes de l'ISET Kebili ! Simplifiez votre expérience académique et suivez vos performances avec facilité.</div>
        </div>
        <div className="right">
          <svg viewBox="0 0 320 300">
            <defs>
              <linearGradient
                inkscape="collect always"
                id="linearGradient"
                x1="13"
                y1="193.49992"
                x2="307"
                y2="193.49992"
                gradientUnits="userSpaceOnUse"
              >
                <stop style={{ stopColor: "#ff00ff" }} offset="0" id="stop876" />
                <stop style={{ stopColor: "#ff0000" }} offset="1" id="stop878" />
              </linearGradient>
            </defs>
            <path d="m 40,120.00016 239.99984,-3.2e-4 c 0,0 24.99263,0.79932 25.00016,35.00016 0.008,34.20084 -25.00016,35 -25.00016,35 h -239.99984 c 0,-0.0205 -25,4.01348 -25,38.5 0,34.48652 25,38.5 25,38.5 h 215 c 0,0 20,-0.99604 20,-25 0,-24.00396 -20,-25 -20,-25 h -190 c 0,0 -20,1.71033 -20,25 0,24.00396 20,25 20,25 h 168.57143" />
          </svg>
          <div className="form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <p className="error-message">{msg}</p>
            <input type="submit" id="submit" value="Se connecter" onClick={Auth} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
