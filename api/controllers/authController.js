import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";
export const register = async (req, res) => {
  const { username, email, password } = req.body;

  const hashpassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      username,
      email,
      password: hashpassword,
    },
  });
  res.status(201).json({ data: newUser });
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });
    if (!user)
      return res.status(401).json({ message: "invalid credentials !" });
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(401).json({ message: "Invalid Credentials!" });
    res;
    // .setHeader("set-Cookie", "test=" + "myValue")
    //.json("successfully access");
    const age = 1000 * 60 * 60 * 24 * 7;
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: age,
    });
    const {password: userPassword, ...userInfo} = user
     res
      .cookie("token" + token, { httpOnly: true, maxAge: age })
      .status(200)
      .json(userInfo);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to login " });
  }
};
export const logout = (req, res) => {
  res.clearCookie("token").status(200).json({ message: "logout successfully" });
};