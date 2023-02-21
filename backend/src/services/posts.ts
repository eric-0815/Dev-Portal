import Post, { PostType } from "../models/Post";
import User from "../models/User";
import { createErrorMsg } from "../utils/error";
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

export const findPostById = async (postId: string) => {
    const post = await Post.findById(postId) as PostType;
    return post
}

export const removePostById = async (postId: string, userId: string) => {
    const post = await findPostById(postId);

    if (!post) return createErrorMsg('Post not found')

    if (post.user.toString() !== userId) return createErrorMsg('User not authorized');

    // @ts-ignore
    await post.remove();

    return ({ msg: "Post removed" });
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