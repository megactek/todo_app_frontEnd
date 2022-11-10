import React from 'react'
import axios from 'axios'

const endPoint = 'http://web.com:8000/todo/todo/'
type Props = {
	task: any
	reload: () => void 
}
const TodoList: React.FC<Props> = ({task, reload}) => {
	const handleCompleted = async (task:number) => {
		const resp = await axios.patch(`${endPoint}${task}/`, { status: 'completed'}).catch(err => console.error(err))
		if(resp){
			console.log('Task status updated')
			reload()
		}
	}
	const handleDelete = async (task:number) => {
		const resp = await axios.delete(`${endPoint}${task}/`).catch(err => console.error(err))
		if(resp){
			console.log('Task deleted')
			reload()
		}
	}
  return (<>
	{
		task.length < 1 ? <span className='empty'>You do not have a To-do List</span> : 
		(
			task.map((task:any) => <li className="list-group-item" key={task.id}>

			<div className={task.status == 'completed' ? `todo-indicator bg-success` : `todo-indicator bg-warning`}></div>
			<div className="widget-content p-0">
			  <div className="widget-content-wrapper">
				
				<div className="widget-content-left">
				  <div className="widget-heading">{task.title}<div className={task.status == 'completed' ? `badge badge-success ml-2`: `badge badge-warning ml-2`}>{task.status}</div>
				  </div>
				  <div className="widget-subheading"><p>{task.description}</p></div>
				</div>
			  <div className="widget-content-right">
				<button className="border-0 btn-transition btn btn-outline-success" onClick={()=>handleCompleted(task.id)} 
				disabled={task.status == 'completed' ? true : false}>
				  <i className="fa fa-check"></i></button>
				  <button className="border-0 btn-transition btn btn-outline-danger" onClick={()=>handleDelete(task.id)}>
				 <i className="fa fa-trash"></i>
				 
				</button>
			  </div>
			  </div>
			</div>
		  </li>)
		)
	}
	
  </>
  )
}

export default TodoList