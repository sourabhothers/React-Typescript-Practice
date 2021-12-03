import { ITodoList } from "@src/App";
import { generateId } from "@src/Helpers";
import { createStore, Reducer } from "redux";
import { TodoDefaultState } from "../Contexts/todo-context";
import deepClone from "deep-clone";

export interface ITodoDefaultState {
  isLoggedIn: boolean;
  todoList: (ITodoList & { _id: string })[];
  lastAccessedTime: number;
  pendingCount: number;
  completedCount: number;
  totalCount: number;
}

type ITodoReducerActionTypes =
  | "addNewTaskToList"
  | "toggleTodoItemState"
  | "deleteTodoItemsByState"
  | "deleteAllTodoItems"
  | "deleteTodoItemById"
  | "updateTotalCount"
  | "updatePendingCount"
  | "updateCompletedCount"
  | "setEntireTodoList";

export interface ITodoReducerAction {
  type: ITodoReducerActionTypes;
  payload: unknown;
}

const todoReducerDefaultState: ITodoDefaultState = {
  todoList: [],
  isLoggedIn: false,
  lastAccessedTime: 0,
  completedCount: 0,
  pendingCount: 0,
  totalCount: 0,
};

const TodoReducer: Reducer<ITodoDefaultState, ITodoReducerAction> = (
  state = TodoDefaultState,
  action
) => {
  switch (action.type) {
    // New CASE
    case "setEntireTodoList":
      const entireTodoList = action.payload as (ITodoList & { _id: string })[];
      return { ...state, todoList: entireTodoList };
    // New CASE
    case "addNewTaskToList":
      const newTodoTaskText = action.payload as string;
      const newTodoItemBuilt = {
        _id: generateId(),
        content: newTodoTaskText,
        state: "pending",
      } as ITodoList & { _id: string };
      const newTodoList = [...state.todoList, newTodoItemBuilt];
      return { ...state, todoList: newTodoList };
    // New CASE
    case "deleteAllTodoItems":
      return { ...state, todoList: [] };
    // New CASE
    case "deleteTodoItemById":
      const _id = action.payload as string;
      const newTodoIdFilter = state.todoList.filter(
        (todoF) => todoF._id !== _id
      );
      return { ...state, todoList: newTodoIdFilter };
    // New CASE
    case "deleteTodoItemsByState":
      const status = action.payload as "completed" | "pending";
      const newTodoStateFilter = state.todoList.filter(
        (todo) => todo.state !== status
      );
      return { ...state, todoList: newTodoStateFilter };
    // New CASE
    case "toggleTodoItemState":
      const _clickedId = action.payload as string;
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
      return { ...state, todoList: _newTodoList };
    // New CASE
    case "updateCompletedCount":
      const completedCount = action.payload as number;
      return { ...state, completedCount };
    // New CASE
    case "updatePendingCount":
      const pendingCount = action.payload as number;
      return { ...state, pendingCount };
    // New CASE
    case "updateTotalCount":
      const totalCount = action.payload as number;
      return { ...state, totalCount };
    default:
      return state;
  }
};

const TodoStore = createStore(TodoReducer);

export type ITodoStoreDispatch = typeof TodoStore.dispatch;

export default TodoStore;
