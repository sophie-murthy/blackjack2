import mongoose from 'mongoose';


mongoose.connect(process.env.DSN);

const UserSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},

});


const User = mongoose.model('User', UserSchema);