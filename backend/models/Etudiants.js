import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Etudiant = db.define('Etudiants',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true},
    nom:{
        type: DataTypes.STRING
    },
    prenom:{
        type: DataTypes.STRING
    },
    date_naiss:{
        type: DataTypes.DATE
        type: DataTypes.DATE
    },
    cin:{
        type: DataTypes.INTEGER
    },
    photo_identite :{
        type: DataTypes.STRING
    },
    
    email:{
        type: DataTypes.STRING,
        primaryKey: true,
        
    },
    password:{
        type: DataTypes.STRING
    }
},{
    freezeTableName:true
});

export default Etudiant;
