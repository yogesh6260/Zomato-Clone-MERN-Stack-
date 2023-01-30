import joi from "joi";

export const ValidateUserData = (userData) => {
    const Schema = joi.object({
        fullName: joi.string().required().min(5),
        email: joi.string().email().required(),
        address: joi
            .array()
            .items(joi.object({ details: joi.string(), for: joi.string() })),
        phoneNumber: joi.array().items(joi.number().min(10).max(10)),
    });
    return Schema.validateAsync(userData);
}