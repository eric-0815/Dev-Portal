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
        }
    }
})

export const { getPostsSuccess, postError } = postSlice.actions;