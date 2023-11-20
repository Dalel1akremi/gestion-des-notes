
import {Sequelize} from "sequelize";

const db = new Sequelize('affichage','root','',{
    host: "localhost",
    dialect: "mysql"
});

export default db;