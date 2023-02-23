import User from "../models/User.model";

export const getUser = async (userId: string) => {
    const user = await User.findById(userId).select('-password');
    return user;
}

