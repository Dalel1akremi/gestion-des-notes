import Etudiant from "../models/Etudiants.js";
import Enseignant from "../models/Enseignants.js";
import Administrateur from "../models/Administrateurs.js";
import { Sequelize } from "sequelize";
import Note from '../models/Notes.js';
import Module from '../models/Modules.js';
import express from 'express';
import multer from 'multer';
import bcrypt from 'bcrypt'; // Assurez-vous d'avoir installé et importé correctement bcrypt
import jwt from "jsonwebtoken";
import nodemailer from 'nodemailer';

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
      const recipients = [email]; // Assuming sending notification to the registered teacher
    const subject = 'Registration Notification';
    const message = `Hello ${prenom} ${nom}, your registration as a teacher is successful.`;

    await sendNotifications(req, res, { recipients, subject, message });
  
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
      const recipients = [email]; // Assuming sending notification to the registered teacher
      const subject = 'Registration Notification';
      const message = `Hello ${prenom} ${nom}, your registration as a student is successful.`;
  
      await sendNotifications(req, res, { recipients, subject, message });
    
  
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
      const recipients = [email]; // Assuming sending notification to the registered teacher
      const subject = '';
      const message = `Hello ${prenom} ${nom}, Thank you for being part of the higher institute of technological studies of Kebili.`;
  
      await sendNotifications(req, res, { recipients, subject, message });
    
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "An error occurred while archiving the student's folder" });
    }
  };




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
    const recipients = [email]; // Assuming sending notification to the registered teacher
    const subject = 'Updating Notification';
    const message = `Hello ${prenom} ${nom}, your information has been updated succefully.`;

    await sendNotifications(req, res, { recipients, subject, message });
  


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
    const recipients = [email]; // Assuming sending notification to the registered teacher
    const subject = 'Updating Notification';
    const message = `Hello ${prenom} ${nom}, your information has been updated succefully.`;

    await sendNotifications(req, res, { recipients, subject, message });
  

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
    const recipients = [email]; // Assuming sending notification to the registered teacher
      const subject = '';
      const message = `Hello ${prenom} ${nom}, Thank you for being part of the higher institute of technological studies of Kebili.`;
  
      await sendNotifications(req, res, { recipients, subject, message });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "An error occurred while archiving the enseignant is folder" });
  }
};



Etudiant.hasMany(Note, { foreignKey: 'id' });
Note.belongsTo(Etudiant, { foreignKey: 'id' });
Module.hasMany(Note, { foreignKey: 'id_module' });
Note.belongsTo(Module, { foreignKey: 'id_module' });

export const SubjectsGrades = async (req, res) => {
  try {
    const studentId = req.params.id;
    const studentData = await Etudiant.findByPk(studentId, {
      include: [
        {
          model: Note,
          attributes: ['id_note', 'id_module', 'id_ens', 'id', 'note_ds1', 'note_ds2', 'note_examen', 'note_tp'],
          include: {
            model: Module,
            attributes: ['id_module', 'nom_matiere', 'coefficient', 'id_ens'],
          },
        },
      ],
    });

    const formattedData = studentData.Notes.map(note => ({
      subject: note.Module.nom_matiere,
      grades: {
        note_ds1: note.note_ds1,
        note_ds2: note.note_ds2,
        note_examen: note.note_examen,
        note_tp: note.note_tp,
      },
    }));

    res.json(formattedData);
    const recipients = [email]; // Assuming sending notification to the registered teacher
    const subject = 'Updating Notification';
    const message = `Hello ${prenom} ${nom}, your information has been updated succefully.`;

    await sendNotifications(req, res, { recipients, subject, message });
  
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

export const teachersProfil = async (req, res) => {
  try {
    const teacherId = req.params.id;

    const teacher = await Enseignant.findByPk(teacherId);

    if (!teacher) {
      return res.status(404).json({ msg: 'Teacher not found' });
    }

    const teacherProfile = {
      id: teacher.id_ens,
      nom: teacher.nom,
      prenom: teacher.prenom,
      cin: teacher.cin,
      Genre: teacher.Genre,
      email: teacher.email,
      password: teacher.password, 
      isArchived: teacher.isArchived,
    };

    // Fetch modules associated with the teacher
    const modules = await Module.findAll({
      where: {
        id_ens: teacherId
      }
    });

    res.json({ teacherProfile, modules }); 
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};

export const studentProfil = async (req, res) => {
  try {
    const studentId = req.params.id;

    // Fetch the student details from the database using the ID
    const student = await Etudiant.findByPk(studentId, {
      attributes: { exclude: ['password'] } // Exclude the password field from the query
    });

    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const studentProfile = {
      id: student.id,
      prenom: student.prenom,
      nom: student.nom,
      date_naiss: student.date_naiss,
      cin: student.cin,
      photo_identite: student.photo_identite,
      email: student.email,
      isArchived: student.isArchived,
    };

    res.json({ studentProfile }); // Return student profile
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Internal Server Error' });
  }
};



export const ajoutNote = async (req, res) => {
  const { id_matiere, id_ens, id, note_ds1, note_examen, note_tp } = req.body;

  try {
    await Note.create({
      id_matiere: id_matiere,
      id_ens: id_ens,
      id: id,
      note_ds1: note_ds1,
      note_examen: note_examen,
      note_tp: note_tp
    });
    
    const student = await Etudiant.findByPk(id); 
    
    if (!student) {
      return res.status(404).json({ msg: 'Student not found' });
    }

    const { email, prenom, nom } = student;
    
    const recipients = [email];
    const subject = 'New grades added';
    const message = `Hello ${prenom} ${nom}, you have new grades added.`;

    await sendNotifications(req, res, { recipients, subject, message });

    res.json({ msg: 'Note ajoutee avec succès' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Erreur d'ajout note" });
  }
};

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'abirghrissi83@gmail.com',
    pass: 'Abir'
  }
});

export const sendEmailNotification = async (recipient, subject, message) => {
  try {
    await transporter.sendMail({
      from: 'abirghrissi83@gmail.com',
      to: recipient,
      subject: subject,
      text: message
    });
    console.log('Notification email sent successfully.');
    return true;
  } catch (error) {
    console.error('Error sending notification email:', error);
    return false;
  }
};

export const sendNotifications = async (req, res) => {
  try {
    const { recipients, subject, message } = req.body;

    if (!recipients || !subject || !message) {
      return res.status(400).json({ msg: 'Please provide recipients, subject, and message.' });
    }

    // Send notifications to recipients sequentially
    for (const recipient of recipients) {
      const emailSent = await sendEmailNotification(recipient, subject, message);
      if (!emailSent) {
        // Handle the case where an email fails to send to a recipient
        console.error(`Failed to send notification to ${recipient}`);
      }
    }

    res.json({ msg: 'Notifications sent successfully.' });
  } catch (error) {
    console.error('Error sending notifications:', error);
    res.status(500).json({ msg: 'Error sending notifications.' });
  }
};
