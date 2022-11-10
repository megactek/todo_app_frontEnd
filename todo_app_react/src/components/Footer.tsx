import axios from 'axios';
import React, { useState } from 'react'

type Props = {
  reload: () => void;
}

const endPoint = 'http://web.com:8000/todo/todo/'

const Footer: React.FC<Props> = ({ reload }) => {
  const [userInput, setUserInput] = useState<any>({})
  const handleChange = (e:any) => {
    setUserInput({
      ...userInput, [e.target.name]: e.target.value
    })
  }
  const handleSubmit = async (e:any) => {
    e.preventDefault()
    const res = await axios.post(endPoint, userInput).catch(err => console.error(err))
    if(res) {
      reload()
      setUserInput({
        title: "",
        description: ""
      })
    }
  }
  return (
    <div className="d-block text-right card-footer">
      <form className='form-card' onSubmit={handleSubmit}>
        <input name="title" type="text" placeholder='Enter To-do...' value={userInput.title}  onChange={handleChange} required/>
        <textarea name="description" placeholder='To-do Description?' value={userInput.description} onChange={handleChange}></textarea>
        <button  type="submit" className="btn btn-primary">Add
					Task</button>
        <button
					className="btn btn-secondary" id='reset'>Cancel</button>
      </form>
    </div>
          
  )
}

export default Footer