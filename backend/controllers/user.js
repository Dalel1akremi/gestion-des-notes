import Etudiant from "../models/Etudiants.js";
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

export const RegisterEtu = async (req, res) => {
  upload.single('photo')(req, res, async (err) => {
    if (err instanceof multer.MulterError) {
      return res.status(400).json({ msg: "Erreur lors du téléchargement de la photo" });
    } else if (err) {
      return res.status(500).json({ msg: "Une erreur est survenue" });
    }

    const { nom, prenom, date_naiss, cin, photo_identite,email, password } = req.body;
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
        photo_identite: photo_identite // Enregistrez le chemin de l'image dans la base de données
      });

      res.json({ msg: "Enregistrement réussi" });
    } catch (error) {
      console.log(error);
      return res.status(404).json({ msg: "Erreur" });
    }
  });
};
