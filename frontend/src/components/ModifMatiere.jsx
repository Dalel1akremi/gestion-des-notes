import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const EditMatiere = () => {
  const { id_matiere } = useParams(); // Use useParams to get parameters from the URL

  const [nom_matiere, setNom_Matiere] = useState('');
  const [coefficient, setCoefficient] = useState('');
  const [contenu, setContenu] = useState('');
  const [type_matiere, setType_matiere] = useState('');
  const [id_ens, setId_ens] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatiereDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getMatiere`);
        const matiereDetails = response.data;

        setNom_Matiere(matiereDetails.nom_matiere);
        setCoefficient(matiereDetails.coefficient);
        setContenu(matiereDetails.contenu);
        setType_matiere(matiereDetails.type_matiere);
        setId_ens(matiereDetails.id_ens);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching matiere details:', error);
      }
    };

    fetchMatiereDetails();
  }, [id_matiere]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/editMatiere/${id_matiere}`, {
        nom_matiere,
        coefficient,
        contenu,
        type_matiere,
        id_ens,
      });
      setMsg(response.data.msg);
    } catch (error) {
      console.error('Error updating matiere details:', error);
    }
  };

  return (
<div>
      <h2>Edit Matiere</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleEdit}>
          <label>
            Nom Matiere:
            <input type="text" value={nom_matiere} onChange={(e) => setNom_Matiere(e.target.value)} />
          </label>
          <label>
            Coefficient:
            <input type="text" value={coefficient} onChange={(e) => setCoefficient(e.target.value)} />
          </label>
          <label>
            Contenu:
            <input type="text" value={contenu} onChange={(e) => setContenu(e.target.value)} />
          </label>
          <label>
            Type Matiere:
            <input type="text" value={type_matiere} onChange={(e) => setType_matiere(e.target.value)} />
          </label>
          <label>
            Id Ens:
            <input type="text" value={id_ens} onChange={(e) => setId_ens(e.target.value)} />
          </label>
          <button type="submit">Save Changes</button>
          {msg && <p>{msg}</p>}
        </form>
      )}
    </div>
  );
};

export default EditMatiere;
