import express from "express";
import { markAttendance, getAttendanceRecords, getEmployeeAttendance } from "../controllers/attendancecontroller.js";

const router = express.Router();

router.post("/mark", markAttendance);
router.get("/records", getAttendanceRecords);
router.get("/empattendance/:id", getEmployeeAttendance);

export default router;
