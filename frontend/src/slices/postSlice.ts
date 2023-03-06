import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
import handleError from "../utils/handleError";
import { setAlert } from "./alertSlice";

interface CounterState {
    posts: any;
    post: any;
    loading: boolean;
    error: any;
}

const initialState: CounterState = {
    posts: [],
    post: null,
    loading: true,
    error: {}
}

export const getPostsAsync = createAsyncThunk<any, undefined>(
    'profile/getPostsAsync',
    async (_, thunkAPI) => {
        try {
            const result = await agent.Post.getPosts();
            if (result) thunkAPI.dispatch(getPostsSuccess(result))
            return result
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)

export const getPostAsync = createAsyncThunk<any, string>(
    'profile/getPostAsync',
    async (postId, thunkAPI) => {
        try {
            const result = await agent.Post.getPost(postId);
            if (result) thunkAPI.dispatch(getPostSuccess(result))
            return result
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)


export const addLikeAsync = createAsyncThunk<any, string>(
    'profile/addLikeAsync',
    async (postId, thunkAPI) => {
        try {
            const result = await agent.Post.putLike(postId);
            if (result) thunkAPI.dispatch(addLike(result))
            return result
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)

export const removeLikeAsync = createAsyncThunk<any, string>(
    'profile/removeLikeAsync',
    async (postId, thunkAPI) => {
        try {
            const result = await agent.Post.removeLike(postId);
            if (result) thunkAPI.dispatch(removeLike(result))
            return result
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)

export const addPostAsync = createAsyncThunk<any, any>(
    'profile/addPostAsync',
    async (formData, thunkAPI) => {
        try {
            const result = await agent.Post.addPost(formData);
            if (result) {
                thunkAPI.dispatch(addPostSuccess(result))
                thunkAPI.dispatch(setAlert({ msg: 'Post created', alertType: 'success' }))
                return result
            }
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)

export const deletePostAsync = createAsyncThunk<any, string>(
    'profile/deletePostAsync',
    async (postId, thunkAPI) => {
        try {
            const result = await agent.Post.deletePost(postId);
            if (result) {
                thunkAPI.dispatch(deletePost(result))
                thunkAPI.dispatch(setAlert({ msg: 'Post removed', alertType: 'success' }))
                return result
            }
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)

export const addCommentAsync = createAsyncThunk<any, any>(
    'profile/addCommentAsync',
    async (data, thunkAPI) => {
        try {
            const { postId, text } = data
            const result = await agent.Post.addComment(postId, { text });
            if (result) {
                thunkAPI.dispatch(addCommentSuccess(result))
                thunkAPI.dispatch(setAlert({ msg: 'Comment added', alertType: 'success' }))
                return result
            }
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)

export const deleteCommentAsync = createAsyncThunk<any, any>(
    'profile/deleteCommentAsync',
    async (data, thunkAPI) => {
        try {
            const { postId, commentId } = data
            const result = await agent.Post.deleteComment(postId, commentId);
            if (result) {
                thunkAPI.dispatch(removeComment(result))
                thunkAPI.dispatch(setAlert({ msg: 'Post removed', alertType: 'success' }))
                return result
            }
        } catch (err: any) {
            handleError(err, postError, thunkAPI)
        }
    }
)

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPostsSuccess: (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        },
        getPostSuccess: (state, action) => {
            state.post = action.payload;
            state.loading = false;
        },

        postError: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        addLike: (state, action) => {
            state.posts = state.posts?.map((post: any) => post.user === action.payload[0].user ? { ...post, likes: action.payload } : post)
            state.loading = false;
        },
        removeLike: (state, action) => {
            state.posts = state.posts?.map((post: any) => post.user === action.payload[0].user ?
                { ...post, likes: post.likes.filter((like: any) => like._id !== action.payload[0]._id) } : post)
            state.loading = false;
        },
        addPostSuccess: (state, action) => {
            state.posts = [...state.posts, action.payload];
            state.loading = false;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post: any) => post._id !== action.payload);
            state.loading = false;
        },
        addCommentSuccess: (state, action) => {
            state.post.comment = action.payload;
            state.loading = false;
        },
        removeComment: (state, action) => {
            state.post = action.payload;
            state.loading = false;
        }
    }
})

export const { getPostsSuccess, getPostSuccess, postError, addLike, removeLike, addPostSuccess, deletePost, addCommentSuccess, removeComment } = postSlice.actions;