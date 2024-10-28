import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CheckboxList.css'

const PostProject = () => {
    const [name, setName] = useState([]);
    const [deadline, setDeadline] = useState([]);
    const [budget, setBudget] = useState([]);
    const [selectedId, setSelectedId] = useState(null);
    const [selectedIdDepartment, setSelectedIdDepartment] = useState(null);
    const [firms, setFirms] = useState([]);

    const CheckboxList2 = () => {return (
        <div className='checkbox-list'>
            {selectedId? firms[selectedId].departments.map((item, index) => (
                <div key={index}>
                    <input type='checkbox' value={index} onChange={handleCheckboxChangeDepartment} checked={selectedIdDepartment == index} />
                    {item.name}
                </div>)) : ''}
        </div>
    );}

    const navigate = useNavigate();

    const apiUrl = 'http://localhost:5153/api/';

    useEffect(() => {
        fetch(apiUrl + 'firm', {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setFirms(data));
    }, []);

    const handleCheckboxChangeDepartment = (event) => {
        const checkedId2 = event.target.value;
        if(selectedIdDepartment !== checkedId2){
            setSelectedIdDepartment(checkedId2)
        } else {
            setSelectedIdDepartment(null)
        }
    }

    const handleCheckboxChange = (event) => {
        const checkedId = event.target.value;
        if(selectedId !== checkedId){
            setSelectedId(checkedId)
        } else {
            setSelectedId(null)
        }
        setSelectedIdDepartment(null)
    }   

    const CheckboxList = () => {
            return (
                <div className='checkbox-list'>
                    {firms.map((item, index) => (
                        <div key={index}>
                            <input type='checkbox' value={index} onChange={handleCheckboxChange} checked={selectedId == index} />
                            {item.name}
                        </div>))}
                </div>
            );
    }

    const handlePost = (e) => {
        e.preventDefault();

        let IdFirm = null;
        let DepName = null;

        if (selectedId !== null){
            IdFirm = firms[selectedId].idFirm
            if(selectedIdDepartment !== null){
                DepName = firms[selectedId].departments[selectedIdDepartment].name
            }
        }


        const newProject = {
            name,
            deadline,
            budget,
            IdFirm,
            DepName
        }
        console.log(newProject)
        fetch(apiUrl + 'project', {
            method: 'POST', 
            headers:{
                'Content-Type': 'application/json'
            }, 
            body: JSON.stringify(newProject)}).then(responce => responce.json())
            .then(e => navigate('/posttask', {
                state: {
                    IdProject: e,
                    MaxDeadline: deadline,
                    depName: DepName
                }
            }));
    }

    return(
        <div className='center'>
            <form onSubmit={handlePost}>
                <label>Project Name:</label><br/>
                <input className='noncheck' type='text' onChange={(e)=>setName(e.target.value)} maxLength='20' required /><br/>
                <label>Deadline:</label><br/>
                <input className='noncheck' type='date' onChange={(e)=>setDeadline(e.target.value)} min={new Date().toJSON().slice(0, 10)} required /><br/>
                <label>Budget:</label><br/>
                <input className='noncheck' type='number' onChange={(e)=>setBudget(e.target.value)} min='0' required /><br/>
                <label>Firm:</label><br/>
                <CheckboxList />
                <label>Department:</label><br/>
                <CheckboxList2 />
                <input className='noncheck' type='submit' />
            </form>
        </div>
    )
}

export default PostProject;