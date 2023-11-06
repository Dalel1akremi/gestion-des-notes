import express from "express";
import { UpdateEtudiant } from "../controllers/user.js";
const router = express.Router();
router.post('/UpdateEtudiant/:id', UpdateEtudiant);
export default router;