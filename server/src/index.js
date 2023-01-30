import express from 'express';
import dotenv from "dotenv";
import passport from 'passport';
import session from 'express-session';

// Private route authorization config
import PrivateRouteConfig from './config/route.config';
import googleAuthConfig from './config/google.config';

// Database Connection
import ConnectDB from "./database/connection";

// APIs
import Auth from "./api/auth";
import Food from "./api/food";
import Restaurant from "./api/restaurant";
import User from "./api/user";
import Menu from "./api/menu";
import Order from "./api/order";
import Review from "./api/review";
import Image from "./api/image";

dotenv.config();

PrivateRouteConfig(passport);
googleAuthConfig(passport);

const Zomato = express();
const PORT = process.env.PORT || 4000;

Zomato.use(express.json());

Zomato.use(session({ secret: process.env.JWTSECRET }));
Zomato.use(passport.initialize());
Zomato.use(passport.session());

Zomato.get("/", (req, res) => {
    res.json({
        message: "Server is running....",
    });
});

// Base routes 
Zomato.use("/auth", Auth);
Zomato.use("/food", Food);
Zomato.use("/restaurant", Restaurant);
Zomato.use("/user", User);
Zomato.use("/menu", Menu);
Zomato.use("/order", Order);
Zomato.use("/review", Review);
Zomato.use("/image", Image);


Zomato.listen(PORT, () => {
    ConnectDB().then(() => {
        console.log("Server is running....");
    }).catch((error) => {
        console.log("Server is running, but the database connection failed.");
        console.log(error);
    })
})