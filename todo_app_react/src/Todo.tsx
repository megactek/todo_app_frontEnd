import React, { useState, useEffect } from 'react'
import './App.css'
import axios from 'axios'
import TodoList from './components/TodoList'
import ScrollBar from 'react-perfect-scrollbar'
import Header from './components/Header'
import Footer from './components/Footer'

const endPoint = 'http://web.com:8000/todo/todo/'

const Todo: React.FC = () => {
    const [taskList, setTaskList] = useState<any[]>([])

    const loadTask = async () => {
        const res = await axios.get(endPoint).catch(err => console.error(err))
        if(res) {
            setTaskList(res.data)
        }
    }

    useEffect(()=> {
        loadTask()
    },[])
  return (
    <div className="row d-flex justify-content-center container">
        <div className="col-md-8">
            <div className="card-hover-shadow-2x mb-3 card">
                <Header />
            </div>
            <div className="scroll-area-sm">
                <ScrollBar className='ps-show-limits'>
                    <div className="ps ps--active-y static-position">
                        <div className="ps-content">
                            <ul className="list-group list-group-flush">
                                <TodoList task={taskList} reload={loadTask}/>
                            </ul>
                        </div>
                    </div>

                </ScrollBar>
            </div>
            <Footer reload={loadTask}/>
        </div>
    </div>
  )
}

export default Todo