/* eslint-disable class-methods-use-this */
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import profiles from "../database/dbSetup";
import helpers from "../helpers/helpers";


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
        this.token = await this.generateToken();
        return this.strip();
    }
    throw new Error("invalid credentials");
}

async generateToken() {
    return jwt.sign(
        {
            exp: (Math.floor(Date.now() / 1000) + 60 * 60) * 24 * 7,
            data: this.strip()
        },
        process.env.JWT_SECRET
    );
}

strip() {
    const { password, hashPassword, ...noPassword } = this;
    return noPassword;
}
}

export default Usermodel;
