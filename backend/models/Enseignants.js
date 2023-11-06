import { DataTypes } from "sequelize";
import db from "../config/DataBase.js";

const Enseignant = db.define('Enseignants', {
    id: {
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
    module: {
        type: DataTypes.STRING
    },
    coeff: {
        type: DataTypes.FLOAT
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

export default Enseignant;
