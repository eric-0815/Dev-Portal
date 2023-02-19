import mongoose from "mongoose";

export interface UserInfo {
    name: string;
    email: string;
    password: string;
    avatar: string;
    data: Date;
}

export interface UserDocument extends UserInfo, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const UserModel = mongoose.model<UserDocument>("User", UserSchema);

export default UserModel
