import { Router } from 'express';
import auth from '../middleware/auth.js';
import roleCheck from "../middleware/roleCheck.js";

const router = Router();

router.get('/', auth, roleCheck(["admin"]), (req, res) => {
    res.status(200).json({ message: "You are authorized to see this." });
});

export default router;