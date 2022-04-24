import React, {useState, useRef, useEffect} from 'react';
import './TodoList';
import TodoList from './TodoList';

// uuid package that generates unique Ids
import { v4 as uuidv4 } from 'uuid';

// create location for storing todos
const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  
  //updates our todos // one default todo
  const [todos, setTodos] = useState([{id: uuidv4(), name: "Todo 1", complete: false}])
  // accesing our textbox
  const todoNameRef = useRef()
  
  // load todos from local storage
  useEffect( () => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTodos) setTodos(storedTodos)
    console.log('loaded items : \r\n' + localStorage.key(LOCAL_STORAGE_KEY));
  }, [])
  
  // create local storage to save our todos
  useEffect( () => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
    console.log('store items : \r\n' + localStorage.key(LOCAL_STORAGE_KEY).value);
  }, [todos])

  // function for the onclick that toggle checkbox
  function ToggleTodo(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.complete = !todo.complete
    setTodos(newTodos)
  }
  
  // Adds a new todo
  function HandleAddTodo(e) {
    const name = todoNameRef.current.value
    if (name === '') return 
    console.log(name)
    
    // set our todos
    setTodos(prevTodos => {
      return [...prevTodos, { id: uuidv4(), name: name, complete: false}]
    })

    // Clears out our input
    todoNameRef.current.value = null
  }
  
  //Clear out todo that are complete
  function HandleClearTodos() {
    const newTodos = todos.filter(todo => !todo.complete)
    setTodos(newTodos)
  }

  //Input in Form
  return (
    <>
    <TodoList todos = {todos} ToggleTodo={ToggleTodo}/>
    <input ref={todoNameRef} type="text" />
    <button onClick={HandleAddTodo}>Add Todo</button>
    <button onClick={HandleClearTodos}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} left to do</div>
    </>
  )
}
export default App;
