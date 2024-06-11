import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    role: String
});

const UserModel = mongoose.model('User', UserSchema);
export default UserModel;