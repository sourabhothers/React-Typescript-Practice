import { ITodoList } from "@src/App";
import { generateId } from "@src/Helpers";

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ITodoDefaultState {
  isLoggedIn: boolean;
  todoList: (ITodoList & { _id: string })[];
  lastAccessedTime: number;
  pendingCount: number;
  completedCount: number;
  totalCount: number;
}

const initialState: ITodoDefaultState = {
  todoList: [],
  isLoggedIn: false,
  lastAccessedTime: 0,
  completedCount: 0,
  pendingCount: 0,
  totalCount: 0,
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addNewTaskToTodoList: (state, action: PayloadAction<string>) => {
      const newTodoTaskText = action.payload as string;
      const newTodoItemBuilt = {
        _id: generateId(),
        content: newTodoTaskText,
        state: "pending",
      } as ITodoList & { _id: string };
      // const newTodoList = [...state.todoList, newTodoItemBuilt];
      state.todoList.push(newTodoItemBuilt);
    },
    setEntireTodoList: (
      state,
      action: PayloadAction<(ITodoList & { _id: string })[]>
    ) => {
      state.todoList = action.payload;
    },
    deleteAllTodoItems: (state) => {
      state.todoList = [];
    },
    deleteTodoItemById: (state, action: PayloadAction<string>) => {
      const _id = action.payload;
      const newTodoIdFilter = state.todoList.filter(
        (todoF) => todoF._id !== _id
      );
      state.todoList = newTodoIdFilter;
    },
    deleteTodoItemsByState: (
      state,
      action: PayloadAction<"completed" | "pending">
    ) => {
      const status = action.payload;
      const newTodoStateFilter = state.todoList.filter(
        (todo) => todo.state !== status
      );
      state.todoList = newTodoStateFilter;
    },
    toggleTodoItemState: (state, action: PayloadAction<string>) => {
      const _clickedId = action.payload;
      // find todo item index
      const foundIndex = state.todoList.findIndex(
        (todoF) => todoF._id === _clickedId
      );
      // change found index todo data
      const _newTodoList = [...state.todoList];
      _newTodoList[foundIndex] = {
        ..._newTodoList[foundIndex],
        state:
          _newTodoList[foundIndex].state === "completed"
            ? "pending"
            : "completed",
      };
      state.todoList = _newTodoList;
    },
    updateCompletedCount: (state, action: PayloadAction<number>) => {
      state.completedCount = action.payload;
    },
    updatePendingCount: (state, action: PayloadAction<number>) => {
      state.pendingCount = action.payload;
    },
    updateTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
});

export const todoActions = todoSlice.actions;

const store = configureStore({
  reducer: {
    todo: todoSlice.reducer,
  },
  devTools: false,
});

export type ITodoRootState = ReturnType<typeof store.getState>;
export type IAppDispatch = typeof store.dispatch;

export const todoSelector = (state: ITodoRootState) => state.todo;

export default store;
