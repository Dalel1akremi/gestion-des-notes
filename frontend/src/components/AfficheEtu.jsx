import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './affichematiere.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifEtu from './ModifEtu'; 

const AfficheEtu = () => {
  const [Etudiant, setEtu] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archiveMessage, setArchiveMessage] = useState('');
  const [selectedEnsId, setSelectedEtuId] = useState(null);
  const fetchEtu = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/getEtu', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEtu(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Etudiant:', error);
    }
  };

  useEffect(() => {
    fetchEtu();
  }, []);
  const ArchiveEtu = async (id) => {
    const confirmed = window.confirm("Voulez-vous vraiment archiver ce Etudiant ?");
  
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:5000/ArchiveEtudiant/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setArchiveMessage(response.data.msg);
  
        setEtu((Etudiant) => Etudiant.filter((etu) => etu.id !== id));

      } catch (error) {
        console.error('Error archiving Etudiant:', error);
        setArchiveMessage('An error occurred while archiving the Etudiant');
      }
    }
  };
  
  return (
    <div>
      <a href="/RegisterEtud"><button className="btn btn-outline-primary">
        
        Ajouter Etudiant
      </button></a>
      
      <h2>Liste des Etudiants</h2>
      <br></br>
      {loading ? (
        <p>Loading...</p>
      ) : (
       
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">id_Ens</th>
              <th scope="col">Nom</th>
              <th scope="col">Prenom</th>
              <th scope="col">Cin</th>
              <th scope="col">date_de_naissance</th>
              <th scope="col">email</th>
   
              <th scope="col">Modification</th>
              <th scope="col">Archivation</th>
            </tr>
          </thead>
          <tbody>
            {Etudiant.map((Etudiant, index) => (
              <tr key={index}>
                <td>{Etudiant.id}</td>
                <td>{Etudiant.nom}</td>
                <td>{Etudiant.prenom}</td>
                <td>{Etudiant.cin}</td>
                <td>{Etudiant.date_naiss}</td>
                <td>{Etudiant.email}</td>
               
                <td>
                <Link to={`/ModifEtu/${Etudiant.id}`}>
                    <button className="btn btn-outline-info" onClick={() => setSelectedEtuId(Etudiant.id)}>
                      Modifier
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() =>ArchiveEtu(Etudiant.id)}>
                    Archiver
                  </button>
                </td>
              </tr>
            ))}
             
          </tbody>
        </table>
        
      )}
    </div>
  );
};

export default AfficheEtu;
