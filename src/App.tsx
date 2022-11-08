import React, { useState } from 'react';
import './App.css';

function App() {
  const [todoForm, setTodoForm] = useState<any>({})
  const [taskList, setTaskList] = useState<any[]>([])

  const handleChange = (e:any) => {
    setTodoForm(
      {
        ...todoForm, [e.target.name] : e.target.value
      }
    )
  }
  const handleSubmit = (e:any) => {
    e.preventDefault()
    const _tempTaskList = taskList
    _tempTaskList.push(todoForm)
    setTaskList(_tempTaskList)
    setTodoForm({
      title: "",
      description: ""
    })
  }
  const removeTask = (index:number) => {
    const taskWithoutIndex = taskList.filter((_, i) => index !== i)
    setTaskList(taskWithoutIndex) 
  }
  return (
    <div className="container">
      <div className="todo_container">
        <div className="header">
        <h2>Todo</h2>
      </div>
      <div className="todo_items">
      {
          taskList.length < 1 ? <i>Your Task Goes Here</i> : 
          taskList.map((item, index) => <div key={index} className="task_item" title="Remove Task" onClick={()=>removeTask(index)}>
            <div className="title">{item.title}</div>
            <div className="description">{item.description}</div>
          </div>
          )
        }
      </div>
      <div className="add_todo_container">
        <h4>Add Todo</h4>
      <form className='todo_form' onSubmit={handleSubmit}>
        <input type="text" name="title" value={todoForm.title} onChange={handleChange} placeholder='Your Task Title' required/>
        <textarea value={todoForm.description} onChange={handleChange} placeholder='Your Task Description' name='description'/>
        <button type="submit">Add</button>
      </form>
      </div>

      </div>
    </div>
  );
}

export default App;
