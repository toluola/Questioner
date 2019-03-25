import jwt from "jsonwebtoken";
import Profile from "../models/user";

const Auth = {
  /**
   * Verify Token
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyToken(req, res, next) {
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ message: "Token not provided" });
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);
      if(decoded){
        const checkUser =  await Profile.findAll({
          where: {
            id: decoded.profile[0].id
          }
        })
        if (!checkUser[0]) {
          return res.status(403).send({ message: "Invalid token provided" });
        }
      }
      if(!decoded) {
        res.status(403).json({
          status: 403,
          message: "Invalid Token Provided"
        })
      }
      
      req.auth_token = decoded;
      next();
    } catch (error) {
      return res.status(400).json({status: 400, message: error.message});
    }
  },

  /**
   * Verify Token Admin
   * @param {object} req
   * @param {object} res
   * @param {object} next
   * @returns {object|void} response object
   */
  async verifyTokenAdmin(req, res, next) {
    try {
      const token = req.headers["access-token"];
      if (!token) {
        return res.status(400).send({ message: "Token not provided" });
      }
      const decoded = await jwt.verify(token, process.env.JWT_SECRET);

      if (decoded) {
        const checkAdmin = await Profile.findAll({
          where: {
            role: "admin",
            id: decoded.profile[0].id
          }
        });

        if (!decoded) {
          return res.status(404).json({
            error: "Invalid Token Provided"
          });
        }

        if (!checkAdmin[0]) {
          return res.status(403).send({
            message: "Invalid token provided. You are not admin :)"
          });
        }

        next();
      }
    } catch (error) {
      return res.status(400).json({ status: 400, message: error.message });
    }
  }
};

export default Auth;
