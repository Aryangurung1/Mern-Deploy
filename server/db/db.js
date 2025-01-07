import mongoose from 'mongoose'

const connectToDatabase = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/Empora')
    } catch(error){
        console.log(error)
    }
}

export default connectToDatabase;