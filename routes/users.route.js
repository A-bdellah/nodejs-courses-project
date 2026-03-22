import express from "express";
import userController from "../controllers/users.controller.js";
import verifyToken from "../middleware/verifyToken.js";
import multer from "multer";
import appError from "../utils/appError.js";

const router = express.Router();

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const fileName = `user-${Date.now()}.${ext}`;
    cb(null, fileName);
  },
});

const fileFilter = function (req, file, cb) {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(appError.create("file must be image", 400), false);
  }
};

const upload = multer({ storage: diskStorage, fileFilter });

// get all users
router.route("/").get(verifyToken, userController.getAllUsers);

// register
router
  .route("/register")
  .post(upload.single("avatar"), userController.register);

// login
router.route("/login").post(userController.login);

export default router;
