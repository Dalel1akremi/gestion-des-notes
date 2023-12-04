import React, { useState } from 'react';
import axios from 'axios';
import "./Signup.css";

const RegisterEns = () => {
                    const [nom,setNom] = useState('');
	const [prenom,setPrenom] = useState('');
	const [email, setEmail] = useState('');
                    const [password, setPassword] = useState('');
                    const [msg, setMsg] = useState('');
                    const[DateNaissance,setDateNaissance]=useState(''); 
                    const [cin,setCin]=useState(''); 
                    const [Genre,setGenre]=useState(''); 
                    const [inscriptionValide, setInscriptionValide] = useState(false);
	const Register= async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/RegisterEns', {
                nom: nom,
                prenom:prenom,    
                DateNaissance:DateNaissance,
                Genre:Genre,
                cin:cin,
                  email: email,
                  password:password
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
                                placeholder="DateNaissance"
                                name="DateNaissance"
                                value={DateNaissance} onChange={(e) => setDateNaissance(e.target.value)} 
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
                                type="text"
                                placeholder="Genre"
                                name="Genre"
                                value={Genre} onChange={(e) => setGenre(e.target.value)} 
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

export default RegisterEns;
