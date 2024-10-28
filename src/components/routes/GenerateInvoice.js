import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './CheckboxList.css'

const GenerateInvoice = () => {
    const [selectedIdClient, setSelectedIdClient] = useState(null);
    const [clients, setClients] = useState([]);
    const [amount, setAmount] = useState([]);
    const [date, setDate] = useState([]);

    const apiUrl = 'http://localhost:5153/api/client';
    const apiPostUrl = 'http://localhost:5153/api/invoice';

    let navigate = useNavigate()

    useEffect(() => {
        fetch(apiUrl, {method: 'GET', headers: {'Content-Type': 'application/json'}})
        .then(response => response.json())
        .then(data => setClients(data));
    }, [])

    const handleCheckboxChangeClient = (event) => {
        const checkedId2 = event.target.value;
        if(selectedIdClient !== checkedId2){
            setSelectedIdClient(checkedId2)
        } else {
            setSelectedIdClient(null)
        }
    }

    const CheckboxListClient = () => {return (
        <div className='checkbox-list'>
            {clients.map((item, index) => (
                <div key={index}>
                    <input type='checkbox' value={index} onChange={handleCheckboxChangeClient} checked={selectedIdClient == index} />
                    {item.name}
                </div>))}
        </div>
    );}

    const handlePost = (e) => {
        e.preventDefault();
        let clientId = null;

        if(selectedIdClient !== null){
            clientId = clients[selectedIdClient].idClient
        }

        const invoice = {
            amount,
            date,
            clientId
        }
        console.log(invoice)
        fetch(apiPostUrl, {method: 'POST', headers: {
            'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(invoice)}).then(navigate('/'))
    }

    const skip = () => {
        navigate('/')
    }

    return(
        <div className="center">
            <form onSubmit={handlePost}>
                <label>Amount:</label><br/>
                <input className="noncheck" type='number' onChange={(e)=>{setAmount(e.target.value)}} min='0' required /><br/>
                <label>Due Date:</label><br/>
                <input className="noncheck" type='date' onChange={(e)=>{setDate(e.target.value)}} min={new Date().toJSON().slice(0, 10)} required /><br/>
                <label>Client:</label><br/>
                <CheckboxListClient />
                <button className="butt" onClick={skip}>Skip</button>
                <input className="butt" type='submit' />
            </form>
        </div>
    )
}

export default GenerateInvoice;