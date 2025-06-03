import { LeftSidebarSlice } from "@/features/left-sidebar-slice";
import { RightSidebarSlice } from "@/features/right-sidebar-slice";
import { xmlSlice } from "@/features/xml-slice";
import { configureStore } from "@reduxjs/toolkit";
// ...

export const store = configureStore({
  reducer: {
    leftSide: LeftSidebarSlice.reducer,
    rightSide: RightSidebarSlice.reducer,
    xml: xmlSlice.reducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
