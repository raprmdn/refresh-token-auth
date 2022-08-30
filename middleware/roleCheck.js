const roleCheck = (roles) => {
    return (req, res, next) => {
        roles.push("user");
        if (roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ error: true, message: "Doesn't have the right roles." });
        }
    }
}

export default roleCheck;