import express from "express";
import {RegisterEtu,registerEns} from "../controllers/user.js"
import { LoginEtudiant ,ArchiveEtudiant} from "../controllers/user.js";
import { verifyToken } from "../middelware/VerifyToken.js";
import { UpdateEtudiant } from "../controllers/user.js";
const router = express.Router();
router.post('/LoginEtudiant', LoginEtudiant);
router.post('/ArchiveEtudiant/:id', ArchiveEtudiant);
router.post('/RegisterEtu',RegisterEtu);
router.post('/registerEns', registerEns);
router.post('/UpdateEtudiant/:id', UpdateEtudiant);
export default router;