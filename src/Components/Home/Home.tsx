import React, { useEffect } from 'react';
import Cart from '../Cart/Cart';
// @ts-ignore
import { useStore } from '../../Store/store';
import { Order, User } from '../../types';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const setUser = useStore((store: any) => store.setCurrentUser);
    const currentUser: User = useStore((store: any) => store.currentUser);

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!currentUser) navigate('/');
    // }, []);

    useEffect(() => {
        fetch(`http://localhost:3009/validate`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    navigate('/');
                    return;
                }
                setUser(data);
            });
    }, []);

    const updateQuantity = async (e: any, order: Order, loggedUser: User) => {
        const quantity: HTMLSelectElement = document.querySelector(
            `select#cart${order.Item?.title}Quantity`
        )!;
        const stringifiedUser = await fetch(
            `http://localhost:3009/update-quantity`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'Application/json',
                },
                body: JSON.stringify({
                    quantity: +quantity.value,
                    itemId: order.Item?.id,
                    userId: loggedUser.id,
                }),
            }
        );
        const parsedUser = await stringifiedUser.json();
        setUser(parsedUser);
    };

    if (!currentUser) return <h1>Loading...</h1>;

    return (
        <>
            <h2>Welcome, {currentUser.name}</h2>
            <Cart user={currentUser} />
        </>
    );
};

export default Home;
