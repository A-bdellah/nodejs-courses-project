import express from "express";
import courseController from "../controllers/courses.controller.js";
import validationSchema from "../middleware/validationSchema.js";
import verifyToken from "../middleware/verifyToken.js";
import userRoles from "../utils/userRoles.js";
import allowedTo from "../middleware/allowedTo.js";
const router = express.Router();

router
  .route("/")
  .get(courseController.getAllCourses)
  .post(
    verifyToken,
    allowedTo(userRoles.MANAGER),
    validationSchema(),
    courseController.addCourse,
  );

router
  .route("/:courseId")
  .get(courseController.getCourse)

  .patch(courseController.updateCourse)

  .delete(
    verifyToken,
    allowedTo(userRoles.MANAGER, userRoles.ADMIN),
    courseController.deleteCourse,
  );

export default router;
