import express from "express";
import { LoginEtudiant ,ArchiveEtudiant} from "../controllers/user.js";
import { verifyToken } from "../middelware/VerifyToken.js";
const router = express.Router();
router.post('/LoginEtudiant', LoginEtudiant);
router.post('/ArchiveEtudiant/:id', ArchiveEtudiant);
export default router;