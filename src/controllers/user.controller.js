import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import secret from "../utils/jwt";
import User from "../models/user.model";

class UserController {
  /*
   *
   * controller to signup a user
   * required: name, email, password
   *
   */
  static async userRegister(req, res) {
    try {
      const { name, email, password } = req.body;
      const hash = await bcrypt.hash(password, 10);

      // check that the email doesn't exist
      const userCheck = await User.findOne({ where: { email } });

      if (userCheck) {
        throw new Error("User with this email already exists");
      }

      const newUser = await User.create({
        name,
        email,
        password: hash
      });

      if (!newUser) {
        throw new Error("Could not signup, try some other time");
      }

      // get the new user to be saved for jwt
      const savedUser = {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email
      };
      const jwtToken = jwt.sign({ user: savedUser, isUser: true }, secret, {
        expiresIn: 86400
      });
      return res.status(201).json({
        status: "success",
        message: "User Registered",
        token: `Bearer ${jwtToken}`,
        data: savedUser
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }

  /*
   *
   * controller to login a user
   * required: email, password
   *
   */
  static async userLogin(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error("Invalid email or password");
      }

      const Comparehash = await bcrypt.compare(password, user.password);

      if (!Comparehash) {
        throw new Error("Invalid email or password");
      }

      const savedUser = {
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone
      };
      const jwtToken = jwt.sign({ user: savedUser, isUser: true }, secret, {
        expiresIn: 86400
      });
      return res.status(200).json({
        status: "success",
        message: "User Logged In",
        token: `Bearer ${jwtToken}`,
        data: savedUser
      });
    } catch (error) {
      return res.status(400).json({
        status: "error",
        message: error.message
      });
    }
  }
}

export default UserController;
