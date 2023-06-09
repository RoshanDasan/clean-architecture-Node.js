"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userAuth_1 = require("../../application/useCases/auth/userAuth");
// authentication controllers
const authControllers = (authServiceInterface, authService, userDbInterface, userDbservice) => {
    const dbUserRepository = userDbInterface(userDbservice());
    const authServices = authServiceInterface(authService());
    const registerUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { name, userName, number, email, password } = req.body;
        const user = {
            name,
            userName,
            number,
            email,
            password,
        };
        const token = await (0, userAuth_1.userRegister)(user, dbUserRepository, authServices);
        res.json({
            status: "success",
            message: "User registered",
            token
        });
    });
    const loginUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { userName, password } = req.body;
        const token = await (0, userAuth_1.userLogin)(userName, password, dbUserRepository, authServices);
        // res.setHeader('authorization', token.token);
        res.json({
            status: "success",
            message: "user verified",
            token
        });
    });
    const googleAuth = (0, express_async_handler_1.default)(async (req, res) => {
        console.log('-----------------------');
        const { fullName, firstName, email } = req.body;
        const userData = { name: fullName, userName: firstName, number: 7594837203, email };
        console.log(userData);
        const { user, token } = await (0, userAuth_1.googleAuthLogin)(userData, dbUserRepository, authServices);
        res.json({
            status: 'Google login success',
            user,
            token
        });
    });
    const blockUser = (0, express_async_handler_1.default)(async (req, res) => {
        const { id } = req.params;
        const blockResult = await (0, userAuth_1.userBlock)(id, dbUserRepository);
        res.json({
            status: `${blockResult} success`
        });
    });
    return {
        registerUser,
        loginUser,
        googleAuth,
        blockUser
    };
};
exports.default = authControllers;
