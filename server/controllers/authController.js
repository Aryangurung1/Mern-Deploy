import jwt from "jsonwebtoken";
import User from "../models/user.js";
import bcrypt from "bcrypt";

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, error: "User Not Found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(404).json({ success: false, error: "Wrong Password" });
    }


    let primaryRole = "employee"; // Default role
    if (user.roles && user.roles.length > 1) {
      const nonEmployeeRoles = user.roles.filter((r) => r !== "employee");
      if (nonEmployeeRoles.length > 0) {
        primaryRole = nonEmployeeRoles[0];
      }
    } else if (user.roles && user.roles.length === 1) {
      primaryRole = user.roles[0];
    }

    console.log("Primary Role:", primaryRole);

    const token = jwt.sign(
      { _id: user._id, role: primaryRole },
      process.env.JWT_KEY,
      { expiresIn: "10d" }
    );
    res.status(200).json({
      success: true,
      token,
      user: { _id: user._id, name: user.name, role: primaryRole },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const verify = (req, res) => {
  return res.status(200).json({ success: true, user: req.user });
};

export { login, verify };
