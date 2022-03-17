import React, {
    ChangeEvent,
    ChangeEventHandler,
    useEffect,
    useState,
} from 'react';

import './App.css';
import { Link, Navigate, Route, Router, Routes } from 'react-router-dom';
import { Item, Order, User } from './types';

import Cart from './Components/Cart/Cart';
import LogIn from './Components/LogIn/LogIn';
import Register from './Components/Register/Register';
// @ts-ignore
import { useStore } from './Store/store';
import Home from './Components/Home/Home';
import Shop from './Components/Shop/Shop';
import NavBar from './Components/Navbar/NavBar';

function App() {
    // const [user, setUser] = useState<User | null>(null);

    // useEffect(() => {
    //     fetch(`http://localhost:3009/items`)
    //         .then((res) => res.json())
    //         .then(setItems);
    // }, []);

    // function handleLogin(e: any) {
    //     e.preventDefault();
    //     fetch('http://localhost:3009/login', {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include',
    //         body: JSON.stringify({
    //             email: e.target.email.value,
    //             password: e.target.password.value,
    //         }),
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             if (data.error) return;
    //             setUser(data);
    //         });
    // }

    // const updateQuantity = async (e: any, order: Order, loggedUser: User) => {
    //     const quantity: HTMLSelectElement = document.querySelector(
    //         `select#cart${order.Item?.title}Quantity`
    //     )!;
    //     const stringifiedUser = await fetch(
    //         `http://localhost:3009/update-quantity`,
    //         {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'Application/json',
    //             },
    //             body: JSON.stringify({
    //                 quantity: +quantity.value,
    //                 itemId: order.Item?.id,
    //                 userId: loggedUser.id,
    //             }),
    //         }
    //     );
    //     const parsedUser = await stringifiedUser.json();
    //     setUser(parsedUser);
    // };

    return (
        <>
            <NavBar />
            <Routes>
                <Route index element={<Navigate replace to={'/shop'} />} />
                <Route path='/sign-in' element={<LogIn />} />
                <Route path='/sign-up' element={<Register />} />
                <Route path='/home' element={<Home />} />
                <Route path='/shop' element={<Shop />} />
            </Routes>
        </>
    );
}

export default App;
