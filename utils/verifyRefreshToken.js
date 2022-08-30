import UserToken from "../models/UserToken.js";
import jwt from "jsonwebtoken";

const verifyRefreshToken = async (refreshToken) => {
    const privateKey = process.env.REFRESH_TOKEN_PRIVATE_KEY;

    return new Promise((resolve, reject) => {
        UserToken.findOne({ refreshToken }, (err, userToken) => {
            if (!userToken) return reject({ error: true, message: "Invalid refresh token" });

            jwt.verify(refreshToken, privateKey, (err, token) => {
                if (err) return reject({ error: true, message: "Invalid refresh token" });

                resolve({
                    error: false,
                    message: "Valid refresh token",
                    token
                });
            });
        });
    });
}

export default verifyRefreshToken;