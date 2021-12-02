import TodoContext from "@src/Store/Contexts/todo-context";
import { FC, FormEventHandler, useContext, useState } from "react";
import classes from '../../App.module.scss'

const TodoForm: FC<{}> = props => {

  const { addNewTaskToList } = useContext(TodoContext)

  const [newTodo, setNewTodo] = useState("")
  const submitHandler: FormEventHandler<HTMLFormElement> = (ev) => {
    ev.preventDefault()
    if (!newTodo) throw new Error("form value empty !");
    addNewTaskToList(newTodo)
    setNewTodo(() => "")
  }

  const id = Math.floor(Math.random() * 1000).toString()

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <input placeholder="Type New To-Do" className={classes.inputText} id={id} type="text" onChange={ev => setNewTodo((pState) => ev.target.value)} value={newTodo} />
      <button className={classes.button} type="submit">Add</button>
    </form>
  )
}

export default TodoForm