/* eslint-disable class-methods-use-this */
import profiles from "../database/dbSetup";
import helpers from "../helpers/helpers";

class Usermodel {
    constructor({ firstname, lastname, email, password }) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.role = 'user';
        this.hashPassword = helpers.hashPassword(password);
      }
    
async Signup(){
       const createUser = await profiles.query(
            "INSERT INTO profiles (firstname, lastname, email, role, password )VALUES ($1, $2, $3, $4, $5 ) returning (id, firstname, lastname, email, role)",
            [this.firstname, this.lastname, this.email, this.role, this.hashPassword]);
        return createUser.rows[0];

    }
}

export default Usermodel;
