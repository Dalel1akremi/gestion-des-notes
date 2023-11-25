import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Note = db.define('Notes',{    
    id_note: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
   
    id_ens: {
        type: DataTypes.INTEGER,
        references:{
            model: 'enseignants',
            key:'id_ens'
        }
    },
    id: {
        type: DataTypes.INTEGER,
        references:{
            model: 'etudiants',
            key:'id'
        }
    },
    note_ds1: {
        type: DataTypes.FLOAT
    },
    note_examen: {
        type: DataTypes.FLOAT
    },
    note_tp: {
        type: DataTypes.FLOAT
    },
    id_matiere: {
        type: DataTypes.INTEGER,
        references:{
            model: 'matieres',
            key:'id_matiere'
        }
    },

   
}, {
    freezeTableName: true
});

export default Note;
