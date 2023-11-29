import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";


const { DataTypes } = Sequelize;

const Matiere = db.define('Matieres', {
  id_matiere: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  id_ens: {
    type: DataTypes.INTEGER,
  
  },
  nom_matiere: {
    type: DataTypes.STRING,
    allowNull: false
  },
  type_matiere:{
type:DataTypes.STRING
  },
  contenu: {
    type: DataTypes.TEXT
  },
  coefficient:{
    type:DataTypes.INTEGER
      },
      isArchived: {
        type: DataTypes.BOOLEAN,
        defaultValue: false 
    },
}, {
  freezeTableName: true
});

export default Matiere;
