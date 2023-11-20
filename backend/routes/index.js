import express from "express";
import {RegisterEtu,registerEns,registerAdm} from "../controllers/user.js"
import { login ,ArchiveEtudiant,UpdateEtudiant} from "../controllers/user.js";
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();
router.post('/login', login);
router.post('/ArchiveEtudiant/:id', ArchiveEtudiant);
router.post('/RegisterEtu',RegisterEtu);
router.post('/registerEns', registerEns);
router.post('/UpdateEtudiant/:id', UpdateEtudiant);
router.post('/registerAdm', registerAdm);
export default router;