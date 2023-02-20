import mongoose from "mongoose";

export interface User {
    name: string;
    email: string;
    password: string;
    avatar: string;
    date: Date;
}

// export interface UserDocument extends UserInfo, mongoose.Document {
//     createdAt: Date;
//     updatedAt: Date;
// }

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        default: Date.now,
    }
})

const User = mongoose.model<User>("user", UserSchema);

export default User
