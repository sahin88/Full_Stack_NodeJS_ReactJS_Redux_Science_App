import mongoose from 'mongoose';


const authSchema = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password:String,
    createdAt: {
        type: Date,
        default: new Date()
    }

})

const AuthMessage = mongoose.model('authMessage', authSchema);

export default AuthMessage;