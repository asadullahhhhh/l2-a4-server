import { NextFunction, Request, Response } from "express";
import Stripe from "stripe";

const createPaymentIntent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const amount = req.body.amount;
        
        const stripe = new Stripe(process.env.PAYMENT_SECRET_KEY as string);
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: "usd",
            payment_method_types: ["card"],
        })
        console.log(paymentIntent);
        res.status(200).json({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        next(error);
    }
}

export const PaymentController = {
    createPaymentIntent
}