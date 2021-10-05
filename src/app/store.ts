import { configureStore } from '@reduxjs/toolkit';
import loggedReducer from '../redux/logged';
import userReducer from '../redux/user';

const store = configureStore({
    reducer: {
        user: userReducer,
        logged: loggedReducer,
    },
});
export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
