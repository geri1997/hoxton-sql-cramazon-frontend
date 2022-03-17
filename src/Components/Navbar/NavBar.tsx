import React from 'react';
import { User } from '../../types';
// @ts-ignore
import { useStore } from '../../Store/store';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = () => {
    const setUser = useStore((store: any) => store.setCurrentUser);
    const navigate = useNavigate();

    const currentUser: User = useStore((store: any) => store.currentUser);

    function signOut() {
        setUser(null);
        fetch('http://localhost:3009/sign-out', {
            method: 'GET',
            credentials: 'include',
        }).then(() => navigate('/'));
    }
    return (
        <>
            <nav>
                <ul>
                    <Link to={'/shop'}>
                        <li>Shop</li>
                    </Link>
                    {currentUser && (
                        <Link to={'/home'}>
                            <li>Cart</li>
                        </Link>
                    )}
                    {!currentUser && (
                        <>
                            <Link to={'/sign-up'}>
                                <li>Sign Up</li>
                            </Link>
                            <Link to={'/sign-in'}>
                                <li>Sign In</li>
                            </Link>
                        </>
                    )}
                    {currentUser && <button onClick={signOut}>Sign out</button>}
                </ul>
            </nav>
            <h1 style={{ textAlign: 'center' }}>CRAMAZON</h1>
        </>
    );
};

export default NavBar;
