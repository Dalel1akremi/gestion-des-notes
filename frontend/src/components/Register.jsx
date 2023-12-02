import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";

const Register = () => {
                    const [nom,setNom] = useState('');
	const [prenom,setPrenom] = useState('');
	const [email, setEmail] = useState('');
                    const [password, setPassword] = useState('');
                    const [msg, setMsg] = useState('');
                    const[date_naiss,setDateNaiss]=useState(''); 
                    const [cin,setCin]=useState(''); 
                    const[photo_identite,setPhoto_identite]=useState('');
                    const [inscriptionValide, setInscriptionValide] = useState(false);
	const Register= async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/RegisterEtu', {
                nom:nom,
                prenom:prenom,
                date_naiss:date_naiss,
                cin:cin,
                photo_identite:photo_identite,
                email: email,
                password: password
            });
            setInscriptionValide(true);
            setTimeout(() => {
                setInscriptionValide(false);
              }, 7000);
            
            window.location = "/login";
        } catch (error) {
            if (error.response) {
                setMsg(error.response.data.msg);
            }
        }
    }


	return (
       
            <div className="signup_container">
                <div className="signup_form_container">
                    <div className="left">
                        <h1>Welcome Back</h1>
                        <a href="/login">
                            <button type="button" className="white_btn">
                                Sing in
                            </button>
                        </a>
                    </div>
                    <div className="right">
                        <form className="form_container" onSubmit={Register}  >
                            <h1>Create Account</h1>
                            <input
                                type="text"
                                placeholder="Nom"
                                name="firstName"
                                value={nom} onChange={(e) => setNom(e.target.value)} 
                                required
                                className="input"
                            />
                            <input
                                type="text"
                                placeholder="Prenom"
                                name="prenom"
                                value={prenom} onChange={(e) => setPrenom(e.target.value)} 
                                required
                                className="input"
                            />
                            <input
                                type="date"
                                placeholder="date_naiss"
                                name="date_naiss"
                                value={date_naiss} onChange={(e) => setDateNaiss(e.target.value)} 
                                required
                                className="input"
                            />
                              <input
                                type="cin"
                                placeholder="cin"
                                name="photo_identite"
                                value={cin} onChange={(e) => setCin(e.target.value)} 
                                required
                                className="input"
                            />
                             <input
                                type="file"
                                placeholder="photo_identite"
                                name="photo_identite"
                                value={photo_identite} onChange={(e) => setPhoto_identite(e.target.value)} 
                                required
                                className="input"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={email} onChange={(e) => setEmail(e.target.value)}
                                required
                                className="input"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                name="password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                required
                                className="input"
                            />
                           {msg && <div className="error_msg">{msg}</div>}
                           {inscriptionValide && <div className="success_msg">Inscription valide</div>}
                            <button type="submit" className="green_btn">
                                Sing Up
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };

export default Register;
