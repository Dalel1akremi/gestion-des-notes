import express from "express";
import {RegisterEtu} from "../controllers/user.js"
const router = express.Router();
//router.post('/LoginEtu', LoginEtu);//***example**//
router.post('/RegisterEtu',RegisterEtu);
export default router;