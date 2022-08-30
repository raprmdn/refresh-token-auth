import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
    const token = req.header("x-access-token");
    if (!token) return res.status(403).send({ error: true, message: "Unauthorized: No Token Provided" });

    try {
        req.user = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY);
        next();
    } catch (err) {
        return res.status(403).send({ error: true, message: "Unauthorized: No Token Provided" });
    }
}

export default auth;