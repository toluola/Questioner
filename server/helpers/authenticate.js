import jwt from "jsonwebtoken";
import db from "../database/dbSetup";

const { JWT_SECRET } = process.env;

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
      const decoded = await jwt.verify(token, JWT_SECRET);

      const text = "SELECT * FROM profiles WHERE id = $1";
      const { rows } = await db.query(text, [decoded.profile.id]);
      if (!rows[0]) {
        return res.status(403).send({ message: "Invalid token provided" });
      }
      req.auth_token = decoded;
      next();
    } catch (error) {
      return res.status(400).send(error);
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
    const token = req.headers["access-token"];
    if (!token) {
      return res.status(400).send({ message: "Token not provided" });
    }
    try {
      const decoded = await jwt.verify(token, JWT_SECRET);

      const text = "SELECT * FROM profiles WHERE id = $1 AND role = $2";
      const { rows } = await db.query(text, [decoded.profile.id, "admin"]);
      if (!rows[0]) {
        return res.status(403).send({
          message: "Invalid token provided. You are not admin :)"
        });
      }
      req.auth_token = decoded;
      next();
    } catch (error) {
      return res.status(400).json({ err: error });
    }
  }
};

export default Auth;
