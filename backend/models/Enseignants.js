import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Enseignant = db.define('Enseignants',{
    id_ens: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING
    },
    cin: {
        type: DataTypes.INTEGER
    },
   Genre:{
    type:DataTypes.STRING
   },
   DateNaissance:{
    type:DataTypes.DATE
} ,
    email:{
        type: DataTypes.VARCHAR?
        primaryKey: true,
    },
    password:{
        type: DataTypes.STRING
    },
    isArchived: {
      type: DataTypes.BOOLEAN, 
      defaultValue: false,
    },
}, {
    freezeTableName: true
});

export default Enseignant;
