import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostProject from './routes/ProjectData';
import PostTask from './routes/PostTask';
import AssignEmployee from './routes/AssignEmployee';
import GenerateInvoice from './routes/GenerateInvoice';

const MyRouter = () => {
    return(
        <Router>
            <Routes>
                <Route path="/" element={<PostProject />} />
                <Route path="/posttask" element={<PostTask />} />
                <Route path="/assignemployee" element={<AssignEmployee />} />
                <Route path="/geninvoice" element={<GenerateInvoice />} />
            </Routes> 
        </Router>
    )
}

export default MyRouter;