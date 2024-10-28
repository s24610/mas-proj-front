import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './CheckboxList.css'

const AssignEmployee = () => {
    const [employees, setEmployees] = useState([]);
    const [selectedId, setSelectedId] = useState(null);

    const apiUrl = 'http://localhost:5153/api/employee?';
    const apiPutUrl = 'http://localhost:5153/api/task';

    let location = useLocation();
    let navigate = useNavigate();
    let taskId = location.state.taskId;
    let depName = location.state.depName;

    useEffect(()=>{
        fetch(apiUrl + new URLSearchParams({
            departmentName: depName
        }), {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setEmployees(data));
    },[])

    const handleCheckboxChange = (event) => {
        const checkedId = event.target.value;
        if(selectedId !== checkedId){
            setSelectedId(checkedId)
        } else {
            setSelectedId(null)
        }
    } 

    const CheckboxList = () => {
        return (
            <div className='checkbox-list'>
                {employees.map((item, index) => (
                    <div key={index}>
                        <input type='checkbox' value={index} onChange={handleCheckboxChange} checked={selectedId == index} />
                        {item.name}
                    </div>))}
            </div>
        );
    }

    const handleSubmit = (e) =>{
        e.preventDefault();

        if(selectedId === null){
            alert('select employee')
            return false
        }

        const puttask = {
            taskId,
            employeeId: employees[selectedId].idEmployee
        }
        console.log(puttask)
        fetch(apiPutUrl, 
            {method: 'PUT', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(puttask)}
        ).then(response => response.json()).then(navigate('/geninvoice'))
    }

    const skip = () => {
        navigate('/geninvoice')
    }

    return(
        <div className="center">
            <form onSubmit={handleSubmit}>
                <label>Employees:</label>
                <CheckboxList />
                <button className="butt" onClick={skip}>Skip</button>
                <input className="butt" type='submit' />
            </form>
        </div>
    )
}

export default AssignEmployee;