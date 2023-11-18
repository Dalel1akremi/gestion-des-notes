import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import { Sequelize } from "sequelize";
import multer from 'multer';
import bcrypt from 'bcrypt'; // Assurez-vous d'avoir installé et importé correctement bcrypt


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../photo'); // Spécifiez le chemin où vous souhaitez enregistrer les images
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

const db = new Sequelize('affichage', 'root', '', {
  host: "localhost",
  dialect: "mysql"
});

export const registerEns = async(req, res) => {
  const {  nom,prenom,cin,email,password ,Genre,DateNaissance,isArchived} = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
      await Enseignant.create({   
        prenom:prenom,    
        nom: nom,
          email: email,
          password: hashPassword,
          cin:cin,
          Genre:Genre,
          DateNaissance:DateNaissance,
          isArchived:isArchived
       
      });
      res.json({msg: "Register secessuful"});
  } catch (error) {
      console.log(error);
      return res.status(404).json({msg: "Eror"});

  } 
}

export const RegisterEtu = async (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ msg: "Erreur lors du téléchargement de la photo" });
    } else if (err) {
      return res.status(500).json({ msg: "Une erreur est survenue" });
    }

    const { nom, prenom, date_naiss, cin, photo_identite,email, password ,isArchived} = req.body;
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      await Etudiant.create({
        nom: nom,
        prenom: prenom,
        date_naiss: date_naiss,
        cin: cin,
        email: email,
        password: hashPassword,
        photo_identite: photo_identite, // Enregistrez le chemin de l'image dans la base de données
        isArchived:isArchived
      });

      res.json({ msg: "Enregistrement réussi" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Erreur" });
    }
  });
};

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

export const UpdateEtudiant = async (req, res) => {
  try {
    const etudiantId = req.params.id;
    const updatedFields = req.body; 

    const etudiant = await Etudiant.findByPk(etudiantId);

    if (!etudiant) {
      return res.status(404).json({ msg: "Student Not Found" });
    }

    await etudiant.update(updatedFields);

    res.json({ msg: "Student's information has been updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while updating the student's information" });
  }
};
export const ArchiveEns= async (req, res) => {
  try {
    const EnseignantId = req.params.id_ens; 
    const enseignant = await Enseignant.findByPk(EnseignantId);

    if (!enseignant) {
      return res.status(404).json({ msg: "Student Not Found" });
    }

    Enseignant.isArchived = true; 

    await Enseignant.save(); 

    res.json({ msg: "Enseignant is folder has been archived." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while archiving the enseignant is folder" });
  }
};
