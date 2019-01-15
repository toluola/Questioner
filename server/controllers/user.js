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
}


export default userController;