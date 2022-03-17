import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// @ts-ignore
import { useStore } from '../../Store/store';

const Register = () => {
    const navigate = useNavigate();
    const setUser = useStore((store: any) => store.setCurrentUser);

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

    function signUp(e: any) {
        e.preventDefault();
        fetch('http://localhost:3009/sign-up', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                name: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
            }),
        })
            .then((res) => res.json())
            .then((serverUser) => {
                if (serverUser.user) {
                    setUser(serverUser);
                    navigate('/home');
                }
            });
    }

    return (
        <>
            <h2>Register</h2>
            <form onSubmit={signUp}>
                <label htmlFor='name'>
                    Name
                    <input name='name' type='text' />
                </label>
                <label htmlFor='email'>
                    Email
                    <input name='email' type='text' />
                </label>
                <label htmlFor='password'>
                    Password
                    <input name='password' type='text' />
                </label>
                <button type='submit'>Sign up</button>
            </form>
            <h3>Or </h3>
            <button onClick={(e) => navigate('/sign-in')}>Log in</button>
        </>
    );
};

export default Register;
