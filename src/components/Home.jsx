import { useState } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { selectAdmin } from '../redux/store';


const Home = () => {
    const admin = useSelector(selectAdmin);
    return (
        <div>
            <h1>Home</h1>
            <Link to="/login">Login</Link>
            {admin && <Link to="/users"/>}
        </div>


    );

};

export default Home;