import Joi from "joi";
import passwordComplexity from "joi-password-complexity";

const registerValidation = (body) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required().label("Name"),
        email: Joi.string().required().email().label("Email"),
        password: passwordComplexity().required().label("Password"),
    });

    return schema.validate(body);
}

const loginValidation = (body) => {
    const schema = Joi.object({
        email: Joi.string().required().email().label("Email"),
        password: Joi.string().required().label("Password"),
    });

    return schema.validate(body);
}

const refreshTokenValidation = (body) => {
    const schema = Joi.object({
        refreshToken: Joi.string().required().label("Refresh Token"),
    });

    return schema.validate(body);
}

export { registerValidation, loginValidation, refreshTokenValidation };

