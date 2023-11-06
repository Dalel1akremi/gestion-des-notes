import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import {Sequelize} from "sequelize";
const db = new Sequelize('affichage','root','04955525',{
  host: "localhost",
  dialect: "mysql"
});
export const LoginEtudiant = async(req, res) => {
   
  try {
      const user = await Etudiant.findAll({
          where:{
              email: req.body.email
          }
   
      });
     
      const match = await bcrypt.compare(req.body.password, user[0].password);
      console.log(match)
      if(!match) return res.status(400).json({msg: "Wrong Password"});
      const userId = user[0].id;
      const email = user[0].email;
      console.log("logged: ", process.env.ACCESS_TOKEN_SECRET)
      const token = jwt.sign({userId,email}, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "7d",
      });
      res.json({token});
      //return token;
  } catch (error) {
      res.status(404).json({msg:"User Not Found "});
  }
}


export const ArchiveEtudiant = async (req, res) => {
    try {
      const etudiantId = req.params.id; 
      const etudiant = await Etudiant.findByPk(etudiantId);
  
      if (!etudiant) {
        return res.status(404).json({ msg: "Student Not Found" });
      }
  
      etudiant.isArchived = true; 
  
      await etudiant.save(); 
  
      res.json({ msg: "Student's folder has been archived." });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "An error occurred while archiving the student's folder" });
    }
  };