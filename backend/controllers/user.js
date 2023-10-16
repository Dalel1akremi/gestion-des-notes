import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import {Sequelize} from "sequelize";
const db = new Sequelize('affichage','root','',{
  host: "localhost",
  dialect: "mysql"
});