import React from 'react';
import { User } from '../../types';
// @ts-ignore
import { useStore } from '../../Store/store';
import { useNavigate } from 'react-router-dom';
const ShopItem = ({
    title,
    price,
    id,
}: {
    title: string;
    price: any;
    id: number | undefined;
}) => {
    const setUser = useStore((store: any) => store.setCurrentUser);
    const user: User = useStore((store: any) => store.currentUser);
    const updateQuantity = useStore((store: any) => store.updateQuantity);

    function createOrder(email: string, itemName: string) {
        fetch('http://localhost:3009/create-order', {
            method: 'POST',
            headers: {
                'Content-Type': 'Application/json',
            },
            body: JSON.stringify({
                quantity: 1,
                email,
                title: itemName,
            }),
        })
            .then((res) => res.json())
            .then((newUser) => setUser(newUser));
    }
    const navigate = useNavigate();
    return (
        <li className='singleProduct'>
            <h3>{title}</h3>
            <h4>${price}</h4>

            {/* <select name='quantity' id={title + 'quantity'}>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
            </select> */}
            <button
                onClick={(e) => {
                    if (!user) {
                        navigate('/sign-in');
                        return;
                    }
                    const userItem = user.itemsOrdered?.find(
                        (item) => item.itemId === id
                    );
                    if (userItem) {
                        updateQuantity(e,false,user,id)
                    } else {
                        createOrder(user.email, title);
                    }
                    navigate('/home');

                    // const quantity: HTMLSelectElement = document.querySelector(
                    //     `select#${title}quantity`
                    // )!;
                    // fetch('http://localhost:3009/create-order', {
                    //     method: 'POST',
                    //     headers: {
                    //         'Content-Type': 'Application/json',
                    //     },
                    //     body: JSON.stringify({
                    //         quantity: +quantity.value,
                    //         email: user.email,
                    //         title,
                    //     }),
                    // })
                    //     .then((res) => res.json())
                    //     .then((newUser) => setUser(newUser));
                }}
            >
                Add to cart
            </button>
        </li>
    );
};

export default ShopItem;
