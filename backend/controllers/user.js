import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import {Sequelize} from "sequelize";
const db = new Sequelize('affichage','root','',{
  host: "localhost",
  dialect: "mysql"
});

export const UpdateEtudiant = async (req, res) => {
  try {
    const etudiantId = req.params.id;
    const updatedFields = req.body; 

    const etudiant = await Etudiant.findByPk(etudiantId);

    if (!etudiant) {
      return res.status(404).json({ msg: "Student Not Found" });
    }

    await etudiant.update(updatedFields);

    res.json({ msg: "Student's information has been updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while updating the student's information" });
  }
};
