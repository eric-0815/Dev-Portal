import mongoose from "mongoose";
import Post, { Comment, PostType } from "../models/Post.model";
import User from "../models/User.model";
import { createErrorMsg } from "../utils/error";
import { validatePostOrCommentInput } from "../utils/validator";

export interface CommentInput extends Comment {
    userId: string;
}

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

export const findUserByIdWithoutPassword = async (userId: string) => {
    const user = await User.findById(userId).select("-password");
    return user
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
    const errors = validatePostOrCommentInput(postInput)
    if (errors.length > 0) return ({ errors })

    // dont' send the password back
    const user = await findUserByIdWithoutPassword(postInput.userId);

    const newPost = new Post({
        text: postInput.text,
        name: user?.name,
        avatar: user?.avatar,
        user: postInput.userId,
    });

    const post = await newPost.save();

    return post
}

export const addLike = async (postId: string, userId: string) => {
    const post = await findPostById(postId);

    // Check if the post has already been liked
    if (post.likes.filter((like) => like.user.toString() === userId).length > 0) return createErrorMsg("Post already liked");

    const ObjectId = new mongoose.Types.ObjectId(userId)
    // @ts-ignore
    post.likes.unshift({ user: ObjectId });
    // @ts-ignore
    await post.save();

    return post.likes;
}

export const addUnLike = async (postId: string, userId: string) => {
    const post = await findPostById(postId);

    // Check if the post has already been liked
    if (!post.likes.some((like) => like.user.toString() === userId)) return createErrorMsg("Post has not yet been liked");

    const like = post.likes.filter((like: any) => userId === like.user.toString())
    // remove the like
    const removeIndex = post.likes
        .map((like) => like.user.toString())
        .indexOf(userId);
    post.likes.splice(removeIndex, 1);
    // @ts-ignore
    await post.save();

    return (like);
}

export const addComment = async (postId: string, comment: CommentInput) => {
    const errors = validatePostOrCommentInput(comment)
    if (errors.length > 0) return ({ errors })

    const user = await findUserByIdWithoutPassword(comment.userId);
    const post = await findPostById(postId);

    const newComment = {
        text: comment.text,
        name: user?.name,
        avatar: user?.avatar,
        user: user?.id,
    };

    // @ts-ignore
    post?.comments.unshift(newComment);
    // @ts-ignore
    await post?.save();

    return post?.comments;
}

export const removeComment = async (postId: string, commentId: string, userId: string) => {

    const post = await findPostById(postId);

    // Pull out comment
    const comment = post.comments.find(
        (comment: any) => comment.id === commentId
    );

    // Make sure comment exists
    if (!comment) return createErrorMsg("Comment does not exist");

    // Check user
    if (comment.user.toString() !== userId) return createErrorMsg("User not authorized");

    // @ts-ignore
    post.comments = post.comments.filter(({ id }) => id !== commentId);
    // @ts-ignore
    await post.save();

    return post
}