
import React, { useState } from 'react'
import axios from 'axios'

type Props  = {
    todos: any[];
    setTodos: (val: any) => void;
    reloadTask: () => void;
    todoList: any[]
}
const endPoint = 'http://web.com:8000/todo/todo/'

const TodoList: React.FC<Props> = ({todos, setTodos, reloadTask, todoList}) => {

    const handleCompleted = async (item:any) => {
        const response = await axios.patch(endPoint+`${item.id}/`, {
            status: 'completed'
        }).catch(err => console.error(err))
        if (response) {
            reloadTask()
        }
    }
   

    const handleDelete = async (id:any) => { 
        const response = await axios.delete(endPoint + `${id}/`).catch(err => console.error(err))
        if (response) {
            console.log('Task deleted successfully')
            reloadTask()
        }
        
    }
    
  return (
    <div>
        
        { todos.length > 0 ? ( todos.map((todo:any) => 
           <li className="list-item" key={todo.id}>
                <input id={todo.id} type="text" className={`list  ${todo.status == 'completed'? 'complete':''}`} value={todo.title} disabled />
                <button className="button-complete task-button" onClick={()=>handleCompleted(todo)}>
                    <i className="fa fa-check-circle"></i>
                </button>
                
                <button className="button-delete task-button" onClick={() => handleDelete(todo.id)}>
                    <i className="fa fa-trash"></i>
                </button>
               </li>
            )) : <p className='no-task'>No task available</p>
        }
    </div>

    )
}

export default TodoList