<<<<<<< HEAD
import jwt from "jsonwebtoken";
import Usermodel from "../models/user"


const { JWT_SECRET } = process.env;

class userController {
    static async signup(req, resp) {
        try {
            const { firstname, lastname, email, password } = req.body;
            const newSignup = new Usermodel({firstname, lastname, email, password});
            const createSignup = await newSignup.Signup();
            return resp.status(200).json({
                status: 200,
                userDetails: createSignup,
                message: "User  Account Created successfully"
            });
            } catch (error) {
            if(error.message === "duplicate key value violates unique constraint \"profiles_email_uindex\"") {
                    resp.status(400).json({
                    status: 400,
                    message: "A user with this email already exist"
            }) }
            else {
                return resp.status(400).json({
                    status: 400,
                    message: error.message
                });
            } 
        }
    }
=======

import Usermodel from "../models/user";


class userController {
    static async signup(req, resp) {
            try {
                const { firstname, lastname, email, password } = req.body;
                const newSignup = new Usermodel({ firstname, lastname, email, password });
                const createdSignup = await newSignup.Signup();
                resp.status(201).json({
                    status: 201,
					profile: createdSignup,
                    message: "User created successfully"
                })   
            } catch (error) {
                if(error.message === "duplicate key value violates unique constraint \"profiles_email_uindex\""){
                    return resp.status(403).json({
                        status: "403",
                        message: "Email Already exist. Thanks"
                    });
                }
                return resp.status(403).json({
                    status: 403,
                    message: "Registration failed. Try later",
                    error: error.message
                });
            }
        };

        static async login(req, resp) {
            try {
                const { email, password } = req.body;
                const newLogin = new Usermodel({ email, password });
                const createdLogin = await newLogin.login();
                return resp.status(201).json({
                       status: 201,
					   token: { createdLogin },
                       message: "User Logged In Successfully"
                })   
            } catch (error) {
                return resp.status(403).json({
                    status: 403,
                    message: "Something Went Wrong. Thanks",
                    error: error.message
                });
            }
        };

>>>>>>> 871d75ce260b2988cdd05d011987bcd656d7243c
}


export default userController;