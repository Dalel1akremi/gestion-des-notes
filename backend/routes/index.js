import express from "express";

import {RegisterEtu,registerEns,login  ,registerAdm,ArchiveEtudiant,UpdateEtudiant,UpdateEnseignant,ArchiveEns,SubjectsGrades,teachersProfil,studentProfil,sendEmailNotification,sendNotifications} from "../controllers/user.js";
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();
router.post('/login', login);
router.post('/ArchiveEtudiant/:id', ArchiveEtudiant);
router.post('/ArchiveEns/:id_ens', ArchiveEns);
router.post('/RegisterEtu',RegisterEtu);
router.post('/registerAdm',registerAdm);
router.post('/registerEns', registerEns);
router.post('/UpdateEtudiant/:id', UpdateEtudiant);
router.post('/UpdateEnseignant/:id', UpdateEnseignant);
router.get('/students/:id/subjects-and-grades',SubjectsGrades);
router.get('/teachersProfil/:id', teachersProfil);
router.get('/studentProfil/:id', studentProfil);
router.post('/sendEmailNotification', sendEmailNotification);
router.post('/sendNotifications', sendNotifications);
export default router;