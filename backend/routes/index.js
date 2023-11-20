import express from "express";

import {RegisterEtu,registerEns,login  ,registerAdm,ArchiveEtudiant,UpdateEtudiant,UpdateEnseignant,ArchiveEns} from "../controllers/user.js";
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();
router.post('/login', login);
router.post('/ArchiveEtudiant/:id', ArchiveEtudiant);
router.post('/ArchiveEns/:id_ens', ArchiveEns);
router.post('/RegisterEtu',RegisterEtu);
router.post('/registerEns', registerEns);
router.post('/UpdateEtudiant/:id', UpdateEtudiant);
router.post('/registerAdm', registerAdm);
router.post('/UpdateEnseignant/:id', UpdateEnseignant);
export default router;