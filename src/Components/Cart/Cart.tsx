import React from 'react';
import { User } from '../../types';
// @ts-ignore
import { useStore } from '../../Store/store';
const Cart = ({ user }: { user: User }) => {
    const updateQuantity = useStore((store: any) => store.updateQuantity);
    function getTotal(user: User) {
        return user.itemsOrdered?.reduce((init, el) => {
            init += el.quantity * el.Item?.price;
            console.log(init);
            return init;
        }, 0).toFixed(2)
    }
    return (
        <section className='cart'>
            <ul className='cart-items'>
                {user.itemsOrdered?.map((order) => (
                    <li key={order.Item?.id}>
                        <h3>{order.Item?.title}</h3>
                        <span>Quantity: {order.quantity}</span>
                        <p>${order.Item?.price}</p>
                        <select
                            value={order.quantity}
                            onChange={(e) => updateQuantity(e, order, user)}
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
            <h3 style={{textAlign:'center'}}>Total: ${getTotal(user)}</h3>
        </section>
    );
};

export default Cart;
