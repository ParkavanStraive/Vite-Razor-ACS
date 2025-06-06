// import { CodeMirrorSlice } from "@/features/code-mirror-slice";
import { navigationSlice } from "@/features/error-navigation-slice";
import { ErrorSlice } from "@/features/error-slice";
import { jobRequestSlice } from "@/features/job-slice";
import { LeftSidebarSlice } from "@/features/left-sidebar-slice";
import { RightSidebarSlice } from "@/features/right-sidebar-slice";
import { TicketSlice } from "@/features/ticket-slice";
import { xmlSlice } from "@/features/xml-slice";
import { configureStore } from "@reduxjs/toolkit";
// ...

export const store = configureStore({
  reducer: {
    leftSide: LeftSidebarSlice.reducer,
    rightSide: RightSidebarSlice.reducer,
    xml: xmlSlice.reducer,
    ticket: TicketSlice.reducer,
    xmlErrors: ErrorSlice.reducer,
    jobRequest: jobRequestSlice.reducer,
    // codeMirror: CodeMirrorSlice.reducer,
    lineCharNavigation: navigationSlice.reducer,
  },
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
