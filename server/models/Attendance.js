import mongoose from "mongoose";
import { Schema } from "mongoose";

const attendanceSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    employeeName: { type: String, required: true },
    departmentName: { type: String, required: true },
    date: { type: Date, required: true, default: Date.now },
    day: { type: String, required: true },
    status: { type: String, enum: ["Present", "Absent", "Holiday"], required: true }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);
export default Attendance;
