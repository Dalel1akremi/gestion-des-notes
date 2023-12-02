import React from 'react'

import { useHistory } from 'react-router-dom';

function Home() {
    const handleLogout = () => {
		localStorage.removeItem("token");
		window.location = "/Login";
	};
	const handleLog = () => {
	
		window.location = "/acceuil";
	};

	return (
		<div> 
		
		<div className="statistic_container" >
			<div className= "section-container" >
				<h1>voulez-vous vraiment se deconnecter?</h1>
				<button className="btn btn-success" onClick={handleLogout} >
					Oui
				</button>
				<button className="btn btn-danger"  onClick={handleLog} >
					Non
				</button>
			</div>
		</div>
		</div>
	);
 
}

export default Home