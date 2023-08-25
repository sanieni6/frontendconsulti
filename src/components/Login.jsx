import { useState } from 'react';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../redux/adminsSlice';
import { selectAdminLoginError, selectAdminLoginLoading } from '../redux/store';

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const loginLoading = useSelector(selectAdminLoginLoading);
    const loginError = useSelector(selectAdminLoginError);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
      };

      return (
        <div className="container">
            <button onClick={() => navigate('/')}>back</button>
            <div className="flex flex-col">
                <h3>Login</h3>
                <form onSubmit={handleSubmit}>
                <input
              placeholder="Email"
              className="input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.currentTarget.value)}
            />
            <input
              placeholder="Password"
              className="input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.currentTarget.value)}
            />
            <button type="submit" className="">
              {loginLoading ? <div className="spinner-border" /> : 'Submit'}
            </button>
          </form>
          {loginError && (
          <small>
            *
            {' '}
            {loginError}
            {' '}
            *
          </small>
          )}
            </div>
        </div>

      );

};

export default Login;
