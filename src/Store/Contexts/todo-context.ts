import { ITodoList } from "@src/App";
import { createContext } from "react";

export interface ITodoState {
  isLoggedIn: boolean;
  todoList: (ITodoList & { _id: string })[];
  lastAccessedTime: number;
  addNewTaskToList: (newTodo: string) => void;
  toggleTodoItemState: (_id: string) => void;
  deleteTodoItemsByState: (by: "completed" | "pending") => void;
  deleteAllTodoItems: () => void;
  pendingCount: number;
  completedCount: number;
  totalCount: number;
  deleteTodoItemById: (_id: string) => void;
}
export const TodoDefaultState: ITodoState = {
  isLoggedIn: false,
  lastAccessedTime: 0,
  todoList: [],
  addNewTaskToList: () => {},
  toggleTodoItemState: () => {},
  deleteTodoItemsByState: () => {},
  deleteAllTodoItems: () => {},
  completedCount: 0,
  pendingCount: 0,
  totalCount: 0,
  deleteTodoItemById: () => {},
};
const TodoContext = createContext(TodoDefaultState);

export default TodoContext;
