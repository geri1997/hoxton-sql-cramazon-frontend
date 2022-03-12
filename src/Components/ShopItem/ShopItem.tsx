import React from 'react';
import { User } from '../../types';

const ShopItem = ({
    title,
    setSelectedUser,
    selectedUser,
}: {
    title: string;
    selectedUser: User;
    setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
}) => {
    return (
        <li>
            <h3>{title}</h3>
            {selectedUser && (
                <>
                    <select name='quantity' id={title + 'quantity'}>
                        <option value='1'>1</option>
                        <option value='2'>2</option>
                        <option value='3'>3</option>
                        <option value='4'>4</option>
                        <option value='5'>5</option>
                        <option value='6'>6</option>
                        <option value='7'>7</option>
                        <option value='7'>7</option>
                    </select>
                    <button
                        onClick={(e) => {
                            const quantity: HTMLSelectElement =
                                document.querySelector(
                                    `select#${title}quantity`
                                )!;
                            fetch('http://localhost:3009/create-order', {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'Application/json',
                                },
                                body: JSON.stringify({  
                                    quantity: +quantity.value,
                                    email: selectedUser.email,
                                    title,
                                }),
                            })
                                .then((res) => res.json())
                                .then((newUser) => setSelectedUser(newUser));
                        }}
                    >
                        Add to cart
                    </button>
                </>
            )}
        </li>
    );
};

export default ShopItem;
