import React, { useState, useEffect } from "react";
import axios from "axios";
import "./login.css";
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
        window.location = "/Affichematiere";
      } else {
        setMsg("User Not Found");
      }
    }).catch(error => {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setMsg(error.response.data.msg);
      }
    });
  }

  return (
<div className="login_container ">	 
<form  className="login" onSubmit={Auth}  >
<h1>Se connecter</h1>
<input  value={email} 
onChange={(e) => setEmail(e.target.value)}
requiredlabel='Email address' id='form1' type='email'
className="input"
placeholder="Email"/>
<input  value={password} 
onChange={(e) => setPassword(e.target.value)}
  requiredlabel='Password' id='form2'
className="input"                                                                                                   
placeholder="Mot de passe" type='password'/>
<div className="d-flex justify-content-between mx-3 mb-4">
  <a href="/Reintialisation"  className="text-primary">Mot de passe oubliee?</a>
</div>
{msg && <div className="error_msg">{msg}</div>}
<a href="/Affichematiere" ><button className="centerr">Se connecter</button></a>
</form>
</div>
  );
};
export default Login;
