import { Router } from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import {loginValidation, registerValidation} from "../utils/validationSchema.js";
import generateToken from "../utils/generateToken.js";

const router = Router();

router.post("/register", async (req, res) => {
    try {
        const { error } = registerValidation(req.body);
        if (error) return res.status(400).json({ error: true, message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (user) return res.status(400).json({ error: true, message: "The given email already been taken." });

        const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        await new User({
            ...req.body,
            password: hashedPassword,
        }).save();

        res.status(201).json({ error: false, message: "User created successfully." });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: true,
            message: `There's an issue with the server. Please try again later.`}
        );
    }
});

router.post("/login", async (req, res) => {
    try {
        const { error } = loginValidation(req.body);
        if (error) return res.status(400).json({ error: true, message: error.details[0].message });

        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(400).json({ error: true, message: "Email or password is incorrect." });

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) return res.status(400).json({ error: true, message: "Email or password is incorrect." });

        // Generate access token and refresh token
        const { accessToken, refreshToken } = await generateToken(user);

        res.status(200).json({
            error: false,
            accessToken,
            refreshToken,
            message: "User logged in successfully."
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: true,
            message: `There's an issue with the server. Please try again later.`}
        );
    }
});

export default router;