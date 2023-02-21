import Post from "../models/Post";
import User from "../models/User";
import { validatePostInput } from "../utils/validator";

export interface PostInput {
    text: string;
    name: string;
    avatar: string;
    userId: string;
}

export const findAllPosts = async () => {
    // descending
    const posts = await Post.find().sort({ date: -1 });
    return posts
}

export const createPost = async (postInput: PostInput) => {
    const errors = validatePostInput(postInput)
    if (errors.length > 0) return ({ errors })

    // dont' send the password back
    const user = await User.findById(postInput.userId).select("-password");

    const newPost = new Post({
        text: postInput.text,
        name: user?.name,
        avatar: user?.avatar,
        user: postInput.userId,
    });

    const post = await newPost.save();

    return post
}