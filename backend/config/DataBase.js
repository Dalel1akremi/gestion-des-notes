
import {Sequelize} from "sequelize";

const db = new Sequelize('affichage','root','04955525',{
    host: "localhost",
    dialect: "mysql"
});

export default db;