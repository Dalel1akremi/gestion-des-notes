import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import {Sequelize} from "sequelize";
import bcrypt from "bcrypt";
const db = new Sequelize('affichage','root','',{
  host: "localhost",
  dialect: "mysql"
});

export const registerEns = async(req, res) => {
  const {  nom,prenom,cin,email,password ,Genre,DateNaissance} = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
      await Enseignant.create({       
        nom: nom,
        prenom:prenom,
          email: email,
          password: hashPassword,
          cin:cin,
          Genre:Genre,
          DateNaissance:DateNaissance
       
      });
      res.json({msg: "Register secessuful"});
  } catch (error) {
      console.log(error);
      return res.status(404).json({msg: "Eror"});

  } 
}