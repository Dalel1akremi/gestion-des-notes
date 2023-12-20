import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './affichematiere.css';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ModifMatiere from './ModifMatiere'; 

const Affichematiere = () => {
  const [Matieres, setMatieres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [archiveMessage, setArchiveMessage] = useState('');
  const [selectedMatiereId, setSelectedMatiereId] = useState(null);
  const fetchMatieres = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/getMatiere', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMatieres(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching matieres:', error);
    }
  };

  useEffect(() => {
    fetchMatieres();
  }, []);
  const archiveMatiere = async (id_matiere) => {
    const confirmed = window.confirm("Voulez-vous vraiment archiver cette matière ?");
  
    if (confirmed) {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://localhost:5000/ArchiveMatiere/${id_matiere}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
  
        setArchiveMessage(response.data.msg);
  
        setMatieres((prevMatieres) =>
          prevMatieres.filter((matiere) => matiere.id_matiere !== response.data.archivedMatiere.id_matiere)
        );
      } catch (error) {
        console.error('Error archiving matiere:', error);
        setArchiveMessage('An error occurred while archiving the matiere');
      }
    }
  };
  
  return (
    <div>
      <a href="/AjoutMatiere"><button className="btn btn-outline-primary">
        
        Ajouter une Matiere
      </button></a>
      
      <h2>Liste des Matieres</h2>
      <br></br>
      {loading ? (
        <p>Loading...</p>
      ) : (
       
        <table className="table table-dark table-striped">
          <thead>
            <tr>
              <th scope="col">id_matiere</th>
              <th scope="col">Matiere</th>
              <th scope="col">contenu</th>
              <th scope="col">coefficient</th>
              <th scope="col">id_ens</th>
              <th scope="col">type_matiere</th>
              <th scope="col">Modification</th>
              <th scope="col">Archivation</th>
            </tr>
          </thead>
          <tbody>
            {Matieres.map((matiere, index) => (
              <tr key={index}>
                <td>{matiere.id_matiere}</td>
                <td>{matiere.nom_matiere}</td>
                <td>{matiere.contenu}</td>
                <td>{matiere.coefficient}</td>
                <td>{matiere.id_ens}</td>
                <td>{matiere.type_matiere}</td>
                <td>
                <Link to={`/ModifMatiere/${matiere.id_matiere}`}>
                    <button className="btn btn-outline-info" onClick={() => setSelectedMatiereId(matiere.id_matiere)}>
                      Modifier
                    </button>
                  </Link>
                </td>
                <td>
                  <button className="btn btn-outline-danger" onClick={() => archiveMatiere(matiere.id_matiere)}>
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

export default Affichematiere;
