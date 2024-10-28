import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './CheckboxList.css'

const PostTask = () => {
    const [description, setDescription] = useState('')
    const [deadline, setDeadline] = useState([])

    const location = useLocation();
    const navigate = useNavigate();
    let projectId = location.state.IdProject;
    let MaxDeadline = location.state.MaxDeadline;
    let depName = location.state.depName;

    const apiUrl = 'http://localhost:5153/api/task';

    const handlePost = (e) => {
        e.preventDefault();

        console.log(description)
        console.log(deadline)
        console.log(projectId)

        const task = {
            description,
            deadline,
            projectId
        }
        console.log(task)
        fetch(apiUrl, 
            {method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(task)}
        ).then(response => response.json()).then(e => navigate('/assignemployee', {
            state: {
                taskId: e,
                depName: depName
            }
        }))
    }

    const skip = () => {
        navigate('/geninvoice')
    }

    return(
        <div className='center'>
            <form onSubmit={handlePost}>
                <lable>Description:</lable><br/>
                <input className='noncheck' type='text' onChange={(e)=>setDescription(e.target.value)} maxLength='200' required /><br/>
                <label>Deadline:</label><br/>
                <input className='noncheck' type='date' onChange={(e)=>setDeadline(e.target.value)} min={new Date().toJSON().slice(0, 10)} max={MaxDeadline} required /> <br/>  
                <button className='butt' onClick={skip}>Skip</button>  
                <input className='butt' type='submit' />
            </form>
        </div>
    )
}

export default PostTask;