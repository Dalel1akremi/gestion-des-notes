import express from "express";
const router = express.Router();
import{inscriptionEnseigant}from "../controllers/user.js";

router.post('/inscriptionEnseigant', inscriptionEnseigant);
export default router;