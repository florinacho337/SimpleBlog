import { configureStore } from "@reduxjs/toolkit";
import { blogPostsReducer } from "./reducer";

const store = configureStore({
    reducer: {
        blogPosts: blogPostsReducer,
    },
});

export default store;