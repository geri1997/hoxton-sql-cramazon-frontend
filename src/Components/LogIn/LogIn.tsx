import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// @ts-ignore
import { useStore } from '../../Store/store';

const LogIn = () => {
    const setUser = useStore((store: any) => store.setCurrentUser);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3009/validate`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return;
                setUser(data);
                navigate('/home');
            });
    }, []);

    function handleLogin(e: any) {
        e.preventDefault();
        fetch('http://localhost:3009/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                email: e.target.email.value,
                password: e.target.password.value,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) return;
                setUser(data);
                navigate('/home');
            });
    }

    return (
        <>
            <h2>Log in</h2>
            <form onSubmit={handleLogin}>
                <label htmlFor='email'>
                    Email
                    <input name='email' type='text' />
                </label>
                <label htmlFor='password'>
                    Password
                    <input name='password' type='text' />
                </label>
                <button type='submit'>Log in</button>
            </form>
            <h3>Or </h3>
            <button onClick={(e) => navigate('/sign-up')}>Register</button>
        </>
    );
};

export default LogIn;
