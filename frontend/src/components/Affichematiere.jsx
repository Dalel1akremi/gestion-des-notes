import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './affichematiere.css';
import { Link } from 'react-router-dom';
import EditMatiere from './ModifMatiere';
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
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`http://localhost:5000/ArchiveMatiere/${id_matiere}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setArchiveMessage(response.data.msg);
    
      await fetchMatieres();
    } catch (error) {
      console.error('Error archiving matiere:', error);
      setArchiveMessage('An error occurred while archiving the matiere');
    }
  };

  return (
    <div>
      <a href="/AjoutMatiere"><button className="btn btn-secondary">
        Ajouter une Matiere
      </button></a>
      <h2>Liste des Matieres</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered">
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
                <Link to={`/EditMatiere/${matiere.id_matiere}`}>
                <button className='btn btn-success' onClick={() => setSelectedMatiereId(matiere.id_matiere)}>
                  Modifier
                </button>
              </Link>
                </td>
                <td>
                  <button className="btn btn-danger" onClick={() => archiveMatiere(matiere.id_matiere)}>
                    Archiver
                  </button>
                </td>
              </tr>
            ))}
             {archiveMessage && <p>{archiveMessage}</p>}
          </tbody>
        </table>
        
      )}
    </div>
  );
};

export default Affichematiere;
