import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Matiere = db.define('Matieres', {
  id_matiere: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom_matiere: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contenu: {
    type: DataTypes.TEXT
  }
}, {
  freezeTableName: true
});

export default Matiere;
