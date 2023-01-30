import joi from 'joi';


export const ValidateOrderDetails = (orderDetails) => {
    const Schema = joi.object({
        food: joi.array().items(joi.object({ details: joi.string(), quantity: joi.number().required() })),
        paymode: joi.string().required(),
        paymentDetails: joi.object({
            itemTotal: joi.number().required(), promo: joi.string().required(),
            tax: joi.string().required(), razorpay_payment_id: joi.string().required()
        })
    });

    return Schema.validateAsync(orderDetails);
}