import User from "../models/User";

export const getUser = async (userId: string) => {
    const user = await User.findById(userId).select('-password');
    return user;
}

