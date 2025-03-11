import bcrypt from 'bcrypt'
import User from '../models/user.js'

const changePassword = async (req, res) => {
    try {
        const {userId, oldPassword, newPassword} = req.body;
        const user = await User.findById({_id: userId})
        if(!user){
            return res.status(404).json({success: false, error: "User not found"})
        }

        const isMatch = await bcrypt.compare(oldPassword, user.password)
        if(!isMatch){
            return res.status(404).json({success: false, error: "Old password is incorrect"})
        }

        const hashPassword = await bcrypt.hash(newPassword, 10)
        const newUser = await User.findByIdAndUpdate
        ({_id: userId}, {password: hashPassword}, {new: true})

        return res.status(200).json({success: true})
    } catch (error) {
        res.status(500).json({success: false, error: "Setting error"})
    }
}

export {changePassword}