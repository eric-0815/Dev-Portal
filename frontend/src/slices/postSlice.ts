import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import agent from "../api/agent";
import handleError from "../utils/handleError";

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


export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getPostsSuccess: (state, action) => {
            state.posts = action.payload;
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
        }
    }
})

export const { getPostsSuccess, postError, addLike, removeLike } = postSlice.actions;