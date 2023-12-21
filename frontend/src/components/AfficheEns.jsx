import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './affichematiere.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifMatiere from './ModifMatiere'; 

const AfficheEns = () => {
  const [Enseignant, setEns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archiveMessage, setArchiveMessage] = useState('');
  const [selectedEnsId, setSelectedEnsId] = useState(null);
  const fetchEns = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/getEns', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEns(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching Enseignant:', error);
    }
  };

  useEffect(() => {
    fetchEns();
  }, []);
  const ArchiveEns = async (id_ens) => {
    const confirmed = window.confirm("Voulez-vous vraiment archiver ce enseignant ?");
  
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:5000/ArchiveEns/${id_ens}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setArchiveMessage(response.data.msg);
  
        setEns((enseignants) => enseignants.filter((ens) => ens.id_ens !== id_ens));

      } catch (error) {
        console.error('Error archiving enseignant:', error);
        setArchiveMessage('An error occurred while archiving the enseignant');
      }
    }
  };
  
  return (
    <div>
      <a href="/RegisterEns"><button className="btn btn-outline-primary">
        
        Ajouter Enseignant
      </button></a>
      
      <h2>Liste des Enseigants</h2>
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
              <th scope="col">Genre</th>
              <th scope="col">Modification</th>
              <th scope="col">Archivation</th>
            </tr>
          </thead>
          <tbody>
            {Enseignant.map((Enseignant, index) => (
              <tr key={index}>
                <td>{Enseignant.id_ens}</td>
                <td>{Enseignant.nom}</td>
                <td>{Enseignant.prenom}</td>
                <td>{Enseignant.cin}</td>
                <td>{Enseignant.DateNaissance}</td>
                <td>{Enseignant.email}</td>
                <td>{Enseignant.Genre}</td>
                <td>
                <Link to={`/ModifEns/${Enseignant.id_ens}`}>
                    <button className="btn btn-outline-info" onClick={() => setSelectedEnsId(Enseignant.id_ens)}>
                      Modifier
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() =>ArchiveEns(Enseignant.id_ens)}>
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

export default AfficheEns;
