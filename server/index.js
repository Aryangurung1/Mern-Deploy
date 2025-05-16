import express from 'express'
import cors from 'cors'
import authRouter from './routes/auth.js'
import departmentRouter from './routes/department.js'
import employeeRouter from './routes/employee.js'
import leaveRouter from './routes/leave.js'
import wfhRouter from './routes/wfh.js'
import settingRouter from './routes/setting.js'
import dashboardRouter from './routes/dashboard.js'
import connectToDatabase from './db/db.js'
import cron from "node-cron";
import { markDailyAttendance } from "./controllers/attendancecontroller.js";
import attendanceRouter from './routes/attendanceRoutes.js'
import noticeRouter from "./routes/notice.js";
import salaryRouter from './routes/salary.js';

connectToDatabase()
const app = express()

// CORS Configuration
const corsOptions = {
  origin: [
    'https://empora-one.vercel.app'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.static('public/uploads'))
app.use('/api/auth', authRouter)
app.use('/api/department', departmentRouter)
app.use('/api/employee', employeeRouter)
app.use('/api/leave', leaveRouter)
app.use('/api/wfh', wfhRouter)
app.use('/api/setting', settingRouter)
app.use('/api/dashboard', dashboardRouter)
app.use('/api/attendance', attendanceRouter)
app.use("/api/notice", noticeRouter);
app.use('/api/salary', salaryRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

// Schedule attendance marking at 12:00 midnight daily
cron.schedule("0 0 * * *", () => {
    console.log("Running daily attendance marking at 12:00 AM");
    markDailyAttendance();
});
