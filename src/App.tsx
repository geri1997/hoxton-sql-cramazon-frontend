import React, {
    ChangeEvent,
    ChangeEventHandler,
    useEffect,
    useState,
} from 'react';

import './App.css';
import { Link, Route, Routes } from 'react-router-dom';
import { Item, User } from './types';
import ShopItem from './Components/ShopItem/ShopItem';

function App() {
    const [users, setUsers] = useState<User[] | []>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [items, setItems] = useState<Item[] | []>([]);

    const onChangeUser = (e: any) => {
        const chosenUser = users.find((user) => user.id === +e.target.value);
        chosenUser && setSelectedUser(chosenUser);
    };

    useEffect(() => {
        fetch(`http://localhost:3009/users`)
            .then((res) => res.json())
            .then((serverUsers) => setUsers(serverUsers));
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3009/items`)
            .then((res) => res.json())
            .then((serverItems) => setItems(serverItems));
    }, []);

    return (
        <>
            <h1 style={{ textAlign: 'center' }}>CRAMAZON</h1>
            <select
                onChange={onChangeUser}
                style={{}}
                name='users'
                id='users'
                value={selectedUser?.id}
            >
                <option value='' hidden selected disabled>
                    Choose user
                </option>
                {users.map((user, i) => (
                    <option key={user.id ?? i} value={user.id}>
                        {user.name}
                    </option>
                ))}
            </select>
            <section className='cart'>
                <ul className='cart-items'>
                    {selectedUser?.itemsOrdered?.map((order) => (
                        <li key={order.Item?.id}>
                            <h3>{order.Item?.title}</h3>
                            <span>Quantity: {order.quantity}</span>
                            <select
                                value={order.quantity}
                                onChange={async (e) => {
                                    const quantity: HTMLSelectElement =
                                        document.querySelector(
                                            `select#cart${order.Item?.title}Quantity`
                                        )!;
                                    const stringifiedUser = await fetch(
                                        `http://localhost:3009/update-quantity`,
                                        {
                                            method: 'POST',
                                            headers: {
                                                'Content-Type':
                                                    'Application/json',
                                            },
                                            body: JSON.stringify({
                                                quantity: +quantity.value,
                                                itemId: order.Item?.id,
                                                userId: selectedUser.id,
                                            }),
                                        }
                                    );
                                    const parsedUser = await stringifiedUser.json()
                                    setSelectedUser(parsedUser)
                                }}
                                name='quantity'
                                id={`cart${order.Item?.title}Quantity`}
                            >
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                                <option value='6'>6</option>
                                <option value='7'>7</option>
                            </select>
                        </li>
                    ))}
                </ul>
            </section>
            <section
                style={{ borderTop: '2px solid black' }}
                className='shopItems'
            >
                <h2>Shop</h2>
                <ul className='itemList'>
                    {items
                        .filter(
                            (item) =>
                                item.id !==
                                selectedUser?.itemsOrdered?.find(
                                    (item1) => item.id === item1.Item?.id
                                )?.Item?.id
                        )
                        .map((item) => {
                            return (
                                <ShopItem
                                    key={'shop' + item.id}
                                    selectedUser={selectedUser!}
                                    title={item.title}
                                    setSelectedUser={setSelectedUser}
                                ></ShopItem>
                            );
                        })}
                </ul>
            </section>
        </>
    );
}

export default App;
