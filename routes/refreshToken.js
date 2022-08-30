import { Router } from "express";
import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";
import verifyRefreshToken from "../utils/verifyRefreshToken.js";
import { refreshTokenValidation } from "../utils/validationSchema.js";

const router = Router();

router.post("/", async (req, res) => {
    const { error } = refreshTokenValidation(req.body);
    if (error) return res.status(400).json({ error: true, message: error.details[0].message });

    verifyRefreshToken(req.body.refreshToken)
        .then(({ token }) => {
            const payload = { _id: token._id, email: token.email, name: token.name, roles: token.roles };
            const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_PRIVATE_KEY, { expiresIn: "14m" });
            res.status(200).json({ error: false, message: "Access Token created", accessToken });
        })
        .catch((error) => {
            res.status(400).json({ error: true, message: error.message });
        });
});

router.delete("/", async (req, res) => {
    try {
        const { error } = refreshTokenValidation(req.body);
        if (error) return res.status(400).json({ error: true, message: error.details[0].message });

        const userToken = await UserToken.findOne({ refreshToken: req.body.refreshToken });
        if (!userToken) return res.status(200).json({ error: false, message: "Logged Out successfully" });

        await userToken.remove();
        res.status(200).json({ error: false, message: "Logged Out successfully" });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: true,
            message: `There's an issue with the server. Please try again later.`}
        );
    }
});

export default router;