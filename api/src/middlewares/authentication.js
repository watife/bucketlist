import jwt from "jsonwebtoken";
import secret from "../utils/jwt";

class AuthController {
  static async verifyUserToken(req, res, next) {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({
        status: "error",
        message: "Only Authenticated users are Authorized"
      });
    }
    const jwtToken = token.split(" ")[1];
    try {
      const decoded = await jwt.verify(jwtToken, secret);
      if (!decoded.isUser) {
        throw new Error("Only Authenticated users are Authorized");
      }
      req.user = decoded.user;
      next();
      return true;
    } catch (err) {
      return res.status(401).json({
        status: "error",
        message: "Only Authenticated users are Authorized"
      });
    }
  }
}

export default AuthController;
