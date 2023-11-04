import express from "express";
const router = express.Router();
import{registerEns}from "../controllers/user.js";

router.post('/registerEns', registerEns);
export default router;