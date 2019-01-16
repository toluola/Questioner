import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import profiles from "../database/dbSetup";
import helpers from "../helpers/helpers";

const { JWT_SECRET } = process.env


class Usermodel {
    constructor({ firstname, lastname, email, password }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = 'user';
        this.password = password;
        this.hashPassword = helpers.hashPassword(password);
      }
    
async Signup(){
       const createUser = await profiles.query(
            "INSERT INTO profiles (firstname, lastname, email, role, password )VALUES ($1, $2, $3, $4, $5 ) returning (id, firstname, lastname, email, role)",
            [this.firstname, this.lastname, this.email, this.role, this.hashPassword]);
        return createUser.rows[0];

    }


async login(){
    const authQuery = await profiles.query("SELECT * FROM profiles WHERE email = $1",
    [this.email]);
    if(!authQuery) throw new Error("invalid credentials");
    const isCorrectPassword = await bcrypt.compare(
        this.password,
        authQuery.rows[0].password
    ); 
    if (isCorrectPassword) {
        authQuery.rows[0].password = null;
        const payload = {
            profile: authQuery.rows[0]
        };

        const token = jwt.sign(payload, JWT_SECRET, {
            expiresIn: "24h"
        });

        return token;
    }
    throw new Error("invalid credentials");
 }
}

export default Usermodel;
