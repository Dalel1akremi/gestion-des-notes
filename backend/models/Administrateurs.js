// models/Administrateurs.js
import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Administrateur = db.define('Administrateurs', {
    id_adm: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nom: {
        type: DataTypes.STRING
    },
    prenom: {
        type: DataTypes.STRING
    }, type: {
        type: DataTypes.STRING, // Adjust the data type and length if needed
        defaultValue: 'administrateur',
      },
    email: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    password: {
        type: DataTypes.STRING
    }
}, {
    freezeTableName: true
});

export default Administrateur;
