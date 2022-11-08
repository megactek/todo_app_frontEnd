import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

const endPoint = 'http://web.com:8000/todo/todo/'
function App() {
  const [todoForm, setTodoForm] = useState<any>({})
  const [taskList, setTaskList] = useState<any[]>([])

  const loadTask = async () => {
    const tasks = await axios.get(endPoint).catch(e => console.error(e))
    if(tasks) {
      setTaskList(tasks.data)
      console.log(tasks)
    }
  }
  useEffect(()=> {
    loadTask();
  }, [])
  const handleChange = (e:any) => {
    setTodoForm(
      {
        ...todoForm, [e.target.name] : e.target.value
      }
    )
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const response = await axios.post(endPoint, todoForm).catch(e => console.error(e))
    if(response) {
      console.log('Task Saved Successfully')
      loadTask();
    }
    setTodoForm({
      title: "",
      description: ""
    })
  }
  const removeTask = async (task:any) => {
    const response = await axios.delete(endPoint + `${task.id}`).catch(e => console.log(e))
    if(response){
      loadTask();
    }
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
          taskList.map((item, index) => <div key={index} className="task_item" title="Remove Task" onClick={()=>removeTask(item)}>
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
