import mongoose from "mongoose";
import { Schema } from "mongoose";

const leaveSchema = new Schema({
    employeeId: { type: Schema.Types.ObjectId, ref: "Employee", required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    reason: { type: String, required: true },
    status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
    appliedAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    monthYear: { type: String, required: true }, // To track which month this WFH belongs to
    daysCount: { type: Number, required: true }, // Number of WFH days for this request
})

const Wfh = mongoose.model("Wfh", leaveSchema);
export default Wfh;