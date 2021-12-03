import { Component, CSSProperties, Dispatch, ErrorInfo, FC, FormEventHandler, MouseEventHandler, Props, SetStateAction, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classes from './App.module.scss'
import Header from './Components/Common/Header/Header';
import TodoForm from './Components/TodoForm/TodoForm';
import { COLORS } from './Constants';
import { generateId } from './Helpers';
import { ITodoDefaultState, IAppDispatch, todoActions, todoSelector } from './Store/Redux/TodoStore'

const InputButton: FC<{ value: string, onClick?: MouseEventHandler<HTMLInputElement> }> = props => (<input onClick={props.onClick} className={classes.inputButton} type="button" value={props.value} />)
const Div: FC<{}> = props => (<div style={{ color: "#eee" }}>{props.children}</div>)


// todoList.json
export interface ITodoList {
  state: "completed" | "pending"
  content: string
}

// App
export default function App() {

  // const { pendingCount, completedCount, totalCount, todoList, deleteTodoItemsByState, deleteAllTodoItems, deleteTodoItemById, toggleTodoItemState, lastAccessedTime } = useContext(TodoContext)
  const dispatch = useDispatch<IAppDispatch>()
  const { completedCount, totalCount, pendingCount, lastAccessedTime, todoList } = useSelector(todoSelector)

  // Fetch Todo list only single time after mount
  useEffect(() => {
    const storedTodoList = localStorage.getItem("todoList") || "[]"

    const todoListAPI: (ITodoList & { _id: string })[] = JSON.parse(storedTodoList) || []
    const todoListConfigured = todoListAPI

    dispatch(todoActions.setEntireTodoList(todoListConfigured))

  }, [])

  // update counts & database list on change of TodoList
  useEffect(() => {
    const totalCount = todoList.length
    const pendingCount = todoList.filter(todo => todo.state === "pending").length
    const completedCount = totalCount - pendingCount

    dispatch(todoActions.updateTotalCount(totalCount))
    dispatch(todoActions.updateCompletedCount(completedCount))
    dispatch(todoActions.updatePendingCount(pendingCount))

    // update TodoList in database
    localStorage.setItem("todoList", JSON.stringify(todoList))

  }, [todoList])


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
        <InputButton onClick={() => { dispatch(todoActions.deleteTodoItemsByState("completed")) }} value="Delete Completed" />
        <InputButton onClick={() => { dispatch(todoActions.deleteTodoItemsByState("pending")) }} value="Delete Pending" />
        <InputButton onClick={() => { dispatch(todoActions.deleteAllTodoItems()) }} value="Delete All" />
      </div>
    </div>
    <TodoForm />
    <ul className={classes.todoList}>
      {
        todoList.map((todo, idx) => (
          <li key={todo._id} style={{ border: todo.state === "completed" ? `2px solid ${COLORS.SUCCESS}` : `2px solid ${COLORS.WARNING}` }} className={classes.todoItem}>
            <span style={{ backgroundColor: todo.state === "completed" ? COLORS.SUCCESS : COLORS.WARNING }} className={classes.leftColorBox}></span>
            <span onClick={() => { dispatch(todoActions.toggleTodoItemState(todo._id)) }} className={classes.todoItemText}>{todo.content}</span>
            <span className={classes.deleteButton} onClick={() => { dispatch(todoActions.deleteTodoItemById(todo._id)) }} >Delete</span>
          </li>
        ))
      }
    </ul>
  </>
}