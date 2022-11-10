import axios from 'axios';
import React, { } from 'react'


type Props = {
  input: any;
  setInput: (val: any) => void;
  reloadTask: ()=>void;
}

const endPoint = 'http://web.com:8000/todo/todo/'

const Form: React.FC<Props> =  ({ input, setInput , reloadTask}) => {
  const onInputChange = (e:any) => {
    setInput({
      ...input, [e.target.name] : e.target.value
    })
  }
  const onFormSubmit = async (e:any) => { 
    e.preventDefault();
    const response = await axios.post(endPoint, input).catch(err => console.log(err));
    if (response) {
      reloadTask()
      console.log('Task Posted Successfully')
    }
    setInput({
      title: ""
    })
  }
  return (
    <form onSubmit={onFormSubmit}>
      <input
        name="title"
       type="text" 
       placeholder='Enter a Todo...' 
       className="task-input" 
       value={input.title} 
       required 
       onChange={onInputChange}/>
      <button className='button-add' type='submit'>Add</button>
    </form>
  )
}

export default Form