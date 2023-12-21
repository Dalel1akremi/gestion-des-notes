import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


const ModifEtu= () => {
  const { id} = useParams(); // Use useParams to get parameters from the URL

  const [nom, setNom] = useState('');
  const [prenom, setPrenom] = useState('');
  const [cin, setCin] = useState('');
  const [email , setEmail] = useState('');
  const [date_naiss , setDate_naiss] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEtuDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/getEtuById/${id}`);
        const EnsDetails = response.data;

        setNom(EnsDetails.nom);
        setPrenom(EnsDetails.prenom);
        setCin(EnsDetails.cin);
        setEmail(EnsDetails.email);
        setDate_naiss(EnsDetails.date_naiss);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching Etudiant details:', error);
      }
    };

    fetchEtuDetails();
  }, [id]);

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:5000/UpdateEtudiant/${id}`, {
        nom,
        prenom,
        cin,
        email,
        date_naiss,
      });
      setMsg(response.data.msg);
      window.location = "/AfficheEtu";
    } catch (error) {
      console.error('Error updating Etudiant details:', error);
    }
  };

  return (
<div>
      <h2>Edit Etudiant</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <form onSubmit={handleEdit}>
          <label>
            <input type="text" value={nom} onChange={(e) => setNom(e.target.value)} className='input'placeholder='Nom '/>
          </label>
          <div>
  
            <input type="text" value={prenom} onChange={(e) => setPrenom(e.target.value)} className='input' placeholder='prenom'/>
          </div>
          <div>
            <input type="text" value={cin} onChange={(e) => setCin(e.target.value)} className='input'placeholder='Cin'/>
          </div>
          <div> 
            <input type="date" value={date_naiss} onChange={(e) => setDate_naiss(e.target.value)} className='input'placeholder='date_de_naissance'/>
          </div>
          <div>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}className='input'placeholder='email' />
          </div>
          <button type="submit">Save Changes</button>
          {msg && <p>{msg}</p>}
        </form>
      )}
    </div>
  );
};

export default ModifEtu;
