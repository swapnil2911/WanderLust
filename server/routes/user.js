import express from "express";
const router = express.Router();

import { googlesignin, signin, signup } from "../controllers/user.js";

router.post("/googlesignin", googlesignin);
router.post("/signin", signin);
router.post("/signup", signup);

export default router;