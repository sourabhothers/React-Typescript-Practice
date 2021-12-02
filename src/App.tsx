import { Component, CSSProperties, Dispatch, ErrorInfo, FC, FormEventHandler, MouseEventHandler, Props, SetStateAction, useContext, useEffect, useState } from 'react';
import classes from './App.module.scss'
import Header from './Components/Common/Header/Header';
import TodoForm from './Components/TodoForm/TodoForm';
import { COLORS } from './Constants';
import { generateId } from './Helpers';
import TodoContext from './Store/Contexts/todo-context';

const InputButton: FC<{ value: string, onClick?: MouseEventHandler<HTMLInputElement> }> = props => (<input onClick={props.onClick} className={classes.inputButton} type="button" value={props.value} />)
const Div: FC<{}> = props => (<div style={{ color: "#eee" }}>{props.children}</div>)


// todoList.json
export interface ITodoList {
  state: "completed" | "pending"
  content: string
}

// App
export default function App() {

  const { pendingCount, completedCount, totalCount, todoList, deleteTodoItemsByState, deleteAllTodoItems, deleteTodoItemById, toggleTodoItemState, lastAccessedTime } = useContext(TodoContext)

  return <>
    <Header title="To-Do List" />
    <div className={classes.sectionCountAndDelete}>
      <div className={classes.countDisplay}>
        <Div >Total Completed : {completedCount}</Div>
        <Div >Total Pending : {pendingCount}</Div>
        <Div >Total : {totalCount}</Div>
        <Div >Last Access Time : {(new Date(lastAccessedTime)).toString()}</Div>
      </div>
      <div className={classes.countDisplay}>
        <InputButton onClick={deleteTodoItemsByState.bind(null, "completed")} value="Delete Completed" />
        <InputButton onClick={deleteTodoItemsByState.bind(null, "pending")} value="Delete Pending" />
        <InputButton onClick={deleteAllTodoItems} value="Delete All" />
      </div>
    </div>
    <TodoForm />
    <ul className={classes.todoList}>
      {
        todoList.map((todo, idx) => (
          <li key={todo._id} style={{ border: todo.state === "completed" ? `2px solid ${COLORS.SUCCESS}` : `2px solid ${COLORS.WARNING}` }} className={classes.todoItem}>
            <span style={{ backgroundColor: todo.state === "completed" ? COLORS.SUCCESS : COLORS.WARNING }} className={classes.leftColorBox}></span>
            <span onClick={toggleTodoItemState.bind(null, todo._id)} className={classes.todoItemText}>{todo.content}</span>
            <span className={classes.deleteButton} onClick={deleteTodoItemById.bind(null, todo._id)} >Delete</span>
          </li>
        ))
      }
    </ul>
  </>
}