import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import Administrateur from "../models/Administrateurs.js";
import Matiere from "../models/Matiere.js";
import { Sequelize } from "sequelize";
import Note from '../models/Notes.js';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt'; // Assurez-vous d'avoir installé et importé correctement bcrypt
import jwt from "jsonwebtoken";



const app = express();
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
  const {  nom,prenom,DateNaissance,Genre,cin,email,password,isArchived } = req.body;
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(password, salt);
  try {
      await Enseignant.create({   
        nom: nom,
        prenom:prenom,    
        DateNaissance:DateNaissance,
        Genre:Genre,
        cin:cin,
          email: email,
          password: hashPassword,
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

 

 // Import other dependencies here if needed



export const UpdateEtudiant = async (req, res) => {
  try {
    const etudiantId = req.params.id;
    let updatedFields = req.body; 

    // Check if the request body contains a password field
    if (updatedFields.password) {
      // Hash the password before updating it
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(updatedFields.password, saltRounds);
      updatedFields.password = hashedPassword;
    }

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



Etudiant.hasMany(Note, { foreignKey: 'id' });
Note.belongsTo(Etudiant, { foreignKey: 'id' });
Matiere.hasMany(Note, { foreignKey: 'id_matiere' });
Note.belongsTo(Matiere, { foreignKey: 'id_matiere' });

export const SubjectsGrades = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await Etudiant.findByPk(studentId, {
      include: [
        {
          model: Note,
          attributes: ['id_note', 'id_matiere', 'id_ens', 'id', 'note_ds1', 'note_examen', 'note_tp'],
          include: {
            model: Matiere,
            attributes: ['id_matiere', 'nom_matiere', 'coefficient','type_matiere', 'id_ens'],
          },
        },
      ],
    });

    const formattedData = studentData.Notes.map(note => ({
      subject: note.Matiere.nom_matiere,
      subject: note.Matiere.nom_matiere,
      grades: {
        note_ds1: note.note_ds1,
        note_examen: note.note_examen,
        note_tp: note.note_tp,
      },
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const ajoutMatiere = async (req, res) => {
  const { nom_matiere, contenu,type_matiere,coefficient,id_ens } = req.body;

  try {
    await Matiere.create({
      nom_matiere: nom_matiere,
      contenu: contenu,
      type_matiere:type_matiere,
      coefficient:coefficient,
      id_ens:id_ens
    });
    res.json({ msg: "successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error" });
  }
};
export const ajoutNote = async (req, res) => {
  const { id_matiere, id_ens,id,note_ds1,note_examen,note_tp } = req.body;

  try {
    await Note.create({
      id_matiere: id_matiere,
      id_ens:id_ens,
      id: id,
      note_ds1:note_ds1,
      note_examen:note_examen,
      note_tp:note_tp
    });
    res.json({ msg: "note ajoutee avec succees" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erreur d'ajout note" });
  }
};
export const editMatiere = async (req, res) => {
  try {
    const matiereId = req.params.id_matiere;
    const updatedFields = req.body; 
    if (updatedFields.password) {
      // Générer un sel pour le hachage
      const salt = await bcrypt.genSalt(10);
      // Hacher le mot de passe avec le sel
      updatedFields.password = await bcrypt.hash(updatedFields.password, salt);
    }
    const Mat = await Matiere.findByPk(matiereId);

    if (!Mat) {
      return res.status(404).json({ msg: "subject Not Found" });
    }

    await Mat.update(updatedFields);

    res.json({ msg: "matiere modifiée avec succees." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "erreur lors de la modification" });
  }
};
export const moyenne = async (req, res) => {
  try {
    // Récupérer toutes les notes avec les détails de la matière associée
    const allNotes = await Note.findAll({
      attributes: ['id', 'note_ds1', 'note_examen', 'note_tp'],
      include: [
        {
          model: Matiere,
          attributes: ['id_matiere', 'nom_matiere', 'coefficient', 'type_matiere'],
        },
        {
          model: Etudiant,
          attributes: ['id', 'nom', 'prenom'],
        },
      ],
    });

    if (allNotes.length === 0) {
      return res.status(404).json({ message: "Aucune note trouvée." });
    }

    // Calculer la moyenne de tous les étudiants
    const moyennes_par_matiere = [];
    const moyenneGenerale = {};

    allNotes.forEach(note => {
      if (note.Etudiant && note.Etudiant.id) {
        const matiere = note.Matiere;
        const etudiant = note.Etudiant;
        let moyenne;

        if (matiere.type_matiere === 'tp') {
          // Si le type de matière est 'tp', calculer la moyenne avec la note tp
          moyenne = (note.note_ds1 + note.note_tp + note.note_examen * matiere.coefficient) / (2 + matiere.coefficient);
        } else {
          // Sinon, calculer la moyenne sans la note tp
          moyenne = (note.note_ds1 + note.note_examen * matiere.coefficient) / (1 + matiere.coefficient);
        }

        moyennes_par_matiere.push({ id_Etudiant: etudiant.id, nom_Etudiant: etudiant.nom, prenom_Etudiant: etudiant.prenom, nom_matiere: matiere.nom_matiere, moyenne });
        

       
        // Calculer la moyenne générale pour chaque étudiant
        if (!moyenneGenerale[etudiant.id]) {
          moyenneGenerale[etudiant.id] = { total: 0, count: 0 };
        }

        moyenneGenerale[etudiant.id].total += moyenne;
        moyenneGenerale[etudiant.id].count += 1;
      }
    });

    // Calculer la moyenne générale finale
    const moyenneGeneraleFinale = [];
    for (const [id, data] of Object.entries(moyenneGenerale)) {
      const moyenne = data.total / data.count;
      moyenneGeneraleFinale.push({ id_Etudiant: parseInt(id), moyenne });
    }

    const moyenneGeneraleTrie = moyenneGeneraleFinale.sort((a, b) => b.moyenne - a.moyenne);

    res.json({ moyennes_par_matiere, moyenneGeneraleTrie });
  } catch (error) {
    console.error('Erreur lors du calcul des moyennes :', error);
    res.status(500).json({ message: 'Erreur serveur lors du calcul des moyennes.' });
  }
};

export const StudentsGrades = async (req, res) => {
  try {
    const enseignantId = req.params.id_ens;

    const studentData = await Etudiant.findByPk(enseignantId, {
      include: [
        {
          model: Note,
          attributes: ['id_note', 'id_matiere', 'id_ens', 'id', 'note_ds1', 'note_examen', 'note_tp'],
          include: [
            {
              model: Etudiant,
              attributes: ['id', 'nom', 'prenom'],
            },
            {
              model: Matiere,
              attributes: ['id_matiere', 'nom_matiere'],
            },
          ],
        },
      ],
    });
    
    const formattedData = studentData.Notes.map(note => ({
      etudiant: {
        id: note.Etudiant.id,
        nom: note.Etudiant.nom,
        prenom:note.Etudiant.prenom, // Use 'nom' instead of 'id' for the student's name
      },
     matiere:note.Matiere.nom_matiere,
      grades: {
        note_ds1: note.note_ds1,
        note_examen: note.note_examen,
        note_tp: note.note_tp,
      },
    }));

    res.json(formattedData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


