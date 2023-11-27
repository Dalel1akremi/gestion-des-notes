import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Module = db.define('Modules', {
    id_module: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nom_matiere: {
      type: DataTypes.STRING
    },
    coefficient: {
      type: DataTypes.FLOAT
    },
    id_ens: {
      type: DataTypes.INTEGER,
      references: {
        model: 'enseignants',
        key: 'id_ens'
      }
    },
  }, {
    freezeTableName: true,
    timestamps: false 
  });
  
  export default Module;
  