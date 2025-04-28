import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveBreakdownSchema = new Schema({
    type: { type: String, required: true },
    days: { type: Number, required: true },
    deduction: { type: Number, required: true }
});

const salarySchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    department: { type: Schema.Types.ObjectId, ref: "Department", required: true },
    month: { type: String, required: true },
    year: { type: Number, required: true },
    baseSalary: { type: Number, required: true },
    deductions: {
        leave: { type: Number, default: 0 },
        tax: { type: Number, default: 0 },
        leaveBreakdown: [leaveBreakdownSchema]
    },
    netSalary: { type: Number, required: true },
    totalLeaveDays: { type: Number, default: 0 },
    dailySalary: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Prevent duplicate salary distribution
salarySchema.index({ employeeId: 1, month: 1, year: 1 }, { unique: true });

const Salary = mongoose.model("Salary", salarySchema);
export default Salary; 