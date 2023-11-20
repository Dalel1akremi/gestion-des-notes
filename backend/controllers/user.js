import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import Administrateur from "../models/Administrateurs.js";
import { Sequelize } from "sequelize";
import multer from 'multer';
import bcrypt from 'bcrypt'; // Assurez-vous d'avoir installé et importé correctement bcrypt
import jwt from "jsonwebtoken";


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

export const registerAdm = async(req, res) => {
  const { nom,prenom,email,password} = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
      await Administrateur.create({   
        prenom:prenom,    
        nom: nom,
          email: email,
          password: hashPassword
       
      });
      res.json({msg: "Register secessuful"});
  } catch (error) {
      console.log(error);
      return res.status(404).json({msg: "Eror"});

  } 
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists in the student table
        let user = await Etudiant.findOne({ where: { email } });
        let userType = 'student';

        if (!user) {
            // If not found in students, check in teachers table
            user = await Enseignant.findOne({ where: { email } });
            userType = 'teacher';
            if (!user) {
                // If not found in teachers, check in administrators table
                user = await Administrateur.findOne({ where: { email } });
                userType = 'admin';
            }
        }

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ msg: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id, userType }, "YOUR_SECRET_KEY");
        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "Server Error" });
    }
};

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
export const UpdateEnseignant = async (req, res) => {
  try {
    const enseignantId = req.params.id;
    const updatedFields = req.body; 
    if (updatedFields.password) {
      // Générer un sel pour le hachage
      const salt = await bcrypt.genSalt(10);
      // Hacher le mot de passe avec le sel
      updatedFields.password = await bcrypt.hash(updatedFields.password, salt);
    }
    const enseignant = await Enseignant.findByPk(enseignantId);

    if (!enseignant) {
      return res.status(404).json({ msg: "Teacher Not Found" });
    }

    await enseignant.update(updatedFields);

    res.json({ msg: "Teacher's information has been updated." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while updating the teacher's information" });
  }
};
export const ArchiveEns= async (req, res) => {
  try {
    const EnseignantId = req.params.id_ens; 
    const enseignant = await Enseignant.findByPk(EnseignantId);

    if (!enseignant) {
      return res.status(404).json({ msg: "Student Not Found" });
    }

    enseignant.isArchived = true; 

    await enseignant.save(); 

    res.json({ msg: "Enseignant is folder has been archived." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while archiving the enseignant is folder" });
  }
};

