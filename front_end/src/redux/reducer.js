import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getBlogPosts } from '../utils/rest-calls';

export const fetchBlogPosts = createAsyncThunk('blogPosts/fetchBlogPosts', async () => {
    const response = await getBlogPosts();
    return response;
});

const blogPostsSlice = createSlice({
    name: 'blogPosts',
    initialState: [],
    reducers: {
        addBlogPost: (state, action) => {
            state.push(action.payload);
            return state;
        },
        removeBlogPost: (state, action) => {
            return state.filter((post) => post.id !== action.payload.id);
        },
        updateBlogPost: (state, action) => {
            return state.map((post) => {
                if (post.id === action.payload.id) {
                    return {
                        ...post,
                        ...action.payload,
                    };
                }
                return post;
            });
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchBlogPosts.fulfilled, (state, action) => {
          return action.payload;
        });
    },
});

export const { addBlogPost, removeBlogPost, updateBlogPost } = blogPostsSlice.actions;
export const blogPostsReducer = blogPostsSlice.reducer;