import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './affichematiere.css';
const Affichematiere = () => {
  const [newMatiere, setNewMatiere] = useState('');
  const [MatiereNames, setMatiereNames] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMatieres = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get('http://localhost:5000/getMatiere', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMatiereNames(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching matieres:', error);
    }
  };

  useEffect(() => {
    // Fetch matieres data on component mount
    fetchMatieres();
  }, []); // Empty dependency array to run the effect only once on mount

  const addMatiere = async () => {
    try {
      if (newMatiere.trim() !== '') {
        const token = localStorage.getItem("token");
        await axios.post('http://localhost:5000/ajoutMatiere', { name: newMatiere }, {
          headers: { Authorization: `Bearer ${token}` }
        });
        // Fetch updated matieres after adding a new one
        await fetchMatieres();
        setNewMatiere('');
      }
    } catch (error) {
      console.error('Error adding matiere:', error);
    }
  };

  const modifierMatiere = async (originalName, updatedName) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/editMatiere/${originalName}`,
        { name: updatedName },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Fetch updated matieres after editing one
      await fetchMatieres();
    } catch (error) {
      console.error('Error editing matiere:', error);
    }
  };

  const archiveMatiere = async (name) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/archiveMatiere/${name}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Fetch updated matieres after archiving one
      await fetchMatieres();
    } catch (error) {
      console.error('Error archiving matiere:', error);
    }
  };

  return (
    <div>
    
    <a href="/ajoutMatiere" ><button  className="btn btn-secondary">
          Ajouter une Matiere
        </button> </a >
        <h2>Liste des Matieres</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <table className="table table-bordered">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Matiere</th>
                <th scope="col">Modification</th>
                <th scope="col">Suppression</th>
              </tr>
            </thead>
            <tbody>
              {MatiereNames.map((MatiereName, index) => (
                <tr key={index}>
                  <td>{MatiereName}</td>
                  <td>
                    <a href="/modifierMatiere"> <button className='btn btn-success'>
                      Modifier
                    </button></a>
                  </td>
                  <td>
                    <button className="btn btn-danger" onClick={() => archiveMatiere(MatiereName)}>
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
