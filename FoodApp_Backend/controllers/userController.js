import bcrypt from "bcryptjs";
import User from "../models/User.js";
import { sendVerificationEmail } from "../utils/sendVerificationEmail.js";

const generateCustomId = async () => {
  const users = await User.find({}, { customId: 1 }).lean();
  const usedIds = new Set(users.map(u => Number(u.customId)));
  let nextId = 1;
  while (usedIds.has(nextId)) nextId++;
  return nextId.toString().padStart(6, "0");
};

// Đăng ký
export const registerUser = async (req, res) => {
  try {
    const { fullName, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email đã được sử dụng!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const customId = await generateCustomId();

    const newUser = await User.create({
      customId,
      fullName,
      email,
      password: hashedPassword,
      role: role || "user",
      active: false, 
    });


    await sendVerificationEmail(email, fullName, customId);

    res.status(201).json({
      success: true,
      message: "Đăng ký thành công! Vui lòng kiểm tra email để xác minh tài khoản.",
      user: {
        id: newUser._id,
        customId: newUser.customId,
        fullName: newUser.fullName,
        email: newUser.email,
        role: newUser.role,
        active: newUser.active,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi đăng ký!", error });
  }
};

// Đăng nhập
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng!" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Sai mật khẩu!" });

    if (!user.active) {
      return res.status(403).json({ message: "Tài khoản chưa được xác minh!" });
    }

    res.json({
      message: "Đăng nhập thành công!",
      user: {
        id: user._id,
        customId: user.customId,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        active: user.active,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi đăng nhập!", error });
  }
};

// Xác minh tài khoản qua email
export const verifyAccount = async (req, res) => {
  try {
    const { email } = req.query;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng!" });
    }

    if (user.active) {
      return res.status(200).json({ success: true, message: "Tài khoản đã được xác minh trước đó!" });
    }

    user.active = true;
    await user.save();

    res.status(200).json({ success: true, message: "Tài khoản đã được xác minh thành công!" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi xác minh tài khoản!", error });
  }
};

// Kiểm tra trạng thái xác minh
export const checkVerificationStatus = async (req, res) => {
  try {
    const { email } = req.query;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "Không tìm thấy người dùng!" });
    }

    res.status(200).json({ success: true, active: user.active });
  } catch (error) {
    res.status(500).json({ success: false, message: "Lỗi khi kiểm tra trạng thái!", error });
  }
};

// Lấy danh sách tất cả user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách user!", error });
  }
};