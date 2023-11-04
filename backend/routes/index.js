import express from "express";
import {RegisterEtu,registerEns} from "../controllers/user.js"
const router = express.Router();
//router.post('/LoginEtu', LoginEtu);//***example**//
router.post('/RegisterEtu',RegisterEtu);
router.post('/registerEns', registerEns);
export default router;