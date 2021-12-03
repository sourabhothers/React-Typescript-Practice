import { ITodoList } from '@src/App'
import { generateId } from '@src/Helpers'
import React, { FC, useEffect, useState } from 'react'
import TodoContext from './todo-context'

const TodoProvider: FC = ({ children }) => {

  const [todoList, setTodoList] = useState<(ITodoList & { _id: string })[]>([])
  let [dataFetched, setDataFetched] = useState<boolean>(false)

  useEffect(() => {
    if (!dataFetched) {
      const todoListAPI: ITodoList[] = JSON.parse(localStorage.getItem("todoList") || "[]")
      const todoListConfigured = todoListAPI.map(todo => ({ ...todo, _id: generateId() }))
      setTodoList(() => todoListConfigured);
      setDataFetched(() => true)
    }
    localStorage.setItem("todoList", JSON.stringify(todoList))
  }, [todoList, dataFetched])


  // useEffect(() => {
  //   const interval1 = setInterval(() => {
  //     addNewTaskToList(generateId())
  //   }, 1)
  //   setTimeout(() => {
  //     clearInterval(interval1)
  //   }, 10000);
  // }, [])


  const addNewTaskToList = (todoContent: string) => {
    setTodoList(pState => ([...pState, { _id: generateId(), content: todoContent, state: "pending" }]))
  }

  const toggleTodoItemState = (_id: string) => {
    const foundIndex = todoList.findIndex(todoF => todoF._id === _id)
    setTodoList((pState) => {
      const _pState = [...pState]
      _pState[foundIndex] = { ..._pState[foundIndex], state: _pState[foundIndex].state === "completed" ? "pending" : "completed" }
      return _pState
    })
  }

  const deleteTodoItemsByState = (state: "completed" | "pending") => {
    setTodoList(pState => pState.filter(todo => todo.state !== state))
  }

  const deleteAllTodoItems = () => { setTodoList(() => []) }

  const deleteTodoItemById = (_id: string) => {
    setTodoList(pState => pState.filter(todoF => todoF._id !== _id))
  }

  const pendingCount = todoList.filter(todo => todo.state === "pending").length
  const completedCount = todoList.filter(todo => todo.state === "completed").length
  const totalCount = todoList.length

  // Todo Context Provider Value

  const TodoContextProviderValue = {
    isLoggedIn: false, todoList, lastAccessedTime: Date.now(),
    addNewTaskToList, toggleTodoItemState, deleteAllTodoItems, deleteTodoItemsByState, deleteTodoItemById,
    completedCount, pendingCount, totalCount
  }

  return <TodoContext.Provider value={TodoContextProviderValue} >{children}</TodoContext.Provider>
}

export default TodoProvider
