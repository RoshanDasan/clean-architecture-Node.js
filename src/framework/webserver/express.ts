import express, { Application, NextFunction } from "express";
import morgan from "morgan";
import CORS from 'cors';
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import configKeys from "../../config";


const expressConfig = (app: Application) => {

    const corsEnable = {
        origin: configKeys.CLIENT_URL,
        exposeHeaders: ['Cross-Origin-Opener-Policy', 'Cross-Origin-Resourse-Policy']
    };

    // express middlewares configuration 
    app.use(CORS(corsEnable));
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(cookieParser());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use(express.urlencoded({ extended: true }))


}

export default expressConfig;