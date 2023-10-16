import { Sequelize } from "sequelize";
import db from "../config/DataBase.js";

const { DataTypes } = Sequelize;

const Enseignant = db.define('Enseignants',{
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
   
    cin:{
        type: DataTypes.INTEGER
    },
    module :{
        type: DataTypes.STRING
    },
    coeff:{
        type:DataTypes.FLOAT
    },
    email:{
        type: DataTypes.VARCHAR?
        primaryKey: true,
    },
    password:{
        type: DataTypes.VARCHAR
    }
},{
    freezeTableName:true
});

export default Enseignant;

