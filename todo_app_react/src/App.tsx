import React, { useState, useEffect } from 'react';
// import './App.css';
import axios from 'axios';
import Header from './components/Header';

const endPoint= 'http://web.com:8000/todo/todo/'



const App: React.FC = () => {
  const [input, setInput] = useState<string>('')
  const [todos, setTodos] = useState<any[]>([])
  const loadTask = async () => {
    const todos = await axios.get(endPoint).catch(err => console.error(err))
    if (todos){
      setTodos(todos.data)
      console.log(todos.data)
    }
  }
  useEffect(() => {
    loadTask();
  }, [])
  
  return (
    <div className="container">
      <div className="app-wrapper">
        <div>
          <Header />
        </div>
        <div>
          {/* <Form input={input} setInput={setInput} reloadTask={loadTask} />
        </div>
        <div>
          <TodoList todos={todos} setTodos={setTodos} reloadTask={loadTask} todoList={todos}></TodoList> */}
        </div>
      </div>
    </div>
  )
}

export default App;
