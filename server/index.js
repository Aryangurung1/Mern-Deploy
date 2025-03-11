import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import leaveRouter from './routes/leave.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import connectToDatabase from './db/db.js'
import cron from "node-cron";
import { markDailyAttendance } from "./controllers/attendanceController.js";
import attendanceRouter from './routes/attendanceRoutes.js'
import noticeRouter from "./routes/notice.js";




connectToDatabase()
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/attendance', attendanceRouter)
app.use("/api/notice", noticeRouter);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port 3000`)
})

// Schedule attendance marking at 12:15 AM daily
cron.schedule("05 00 * * *", () => {
    markDailyAttendance();
    console.log("Scheduled attendance marking executed at 12:22 PM.");
});
