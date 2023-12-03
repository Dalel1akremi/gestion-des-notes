import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AjoutMatiere = () => {
    const [type_matiere, setType_matiere] = useState('');
    const [nom_matiere, setNom_Matiere] = useState('');
    const [coefficient, setCoefficient] = useState('');
    const [contenu, setContenu] = useState('');
    const [id_ens, setId_ens] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [loading, setLoading] = useState('');
    const [msg, setMsg] = useState(null);
  
    const Ajout =async (e) => {
      e.preventDefault();
      try {
          const response = await axios.post('http://localhost:5000/ajoutMatiere', {
            id_ens: id_ens,
          nom_matiere: nom_matiere,
          type_matiere: type_matiere,
              contenu: contenu,
              coefficient: coefficient,
              
          });
  
          setSuccessMessage(response.data.message);
          window.location = "/Affichematiere";

            
            } catch (error) {
                if (error.response) {
                    setMsg(error.response.data.msg);
                }
            }
        }
    return (
      <div>
        <div className="essential-section">
          <div className="middle-section">
            
              <h2>Ajout Matiere</h2>
              <form  className="ajout" onSubmit={Ajout}  >
              <input
                type="text"
                placeholder="Nom_matiere"
                name="Nom_matiere"
                value={nom_matiere}
                onChange={(e) => setNom_Matiere(e.target.value)}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Contenu"
                name="Contenu"
                value={contenu}
                onChange={(e) => setContenu(e.target.value)}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Coefficient"
                name="Coefficient"
                value={coefficient}
                onChange={(e) => setCoefficient(e.target.value)}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Id_ens"
                name="Id_ens"
                value={id_ens}
                onChange={(e) => setId_ens(e.target.value)}
                required
                className="input"
              />
              <input
                type="text"
                placeholder="Type_matiere"
                name="Type_matiere"
                value={type_matiere}
                onChange={(e) => setType_matiere(e.target.value)}
                required
                className="input"
              />
              <button type="submit" className="btn btn-secondary">
                Ajouter
              </button>
            </form>
          </div>
        </div>
  
        {successMessage && <p className="success-message">{successMessage}</p>}
      </div>
    );
  };
  
  export default AjoutMatiere;