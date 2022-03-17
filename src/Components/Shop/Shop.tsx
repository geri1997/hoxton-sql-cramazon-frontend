import React, { useEffect } from 'react';
import ShopItem from '../ShopItem/ShopItem';

// @ts-ignore
import { useStore } from '../../Store/store';
import { useNavigate } from 'react-router-dom';
import { Item, User } from '../../types';

const Shop = () => {
    const navigate = useNavigate();
    const setItems = useStore((store: any) => store.setProducts);
    const items: Item[] = useStore((store: any) => store.products);
    const setUser = useStore((store: any) => store.setCurrentUser);


    useEffect(() => {
        fetch(`http://localhost:3009/items`)
            .then((res) => res.json())
            .then(setItems);
    }, []);

    useEffect(() => {
        fetch(`http://localhost:3009/validate`, {
            credentials: 'include',
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return;
                }
                setUser(data);
            });
    }, []);

    return (
        <section style={{ borderTop: '2px solid black' }} className='shopItems'>
            <h2 style={{ textAlign: 'center' }}>Shop</h2>
            <ul className='itemList'>
                {items.map((item) => {
                    return (
                        <ShopItem
                            id={item.id}
                            price={item.price}
                            key={'shop' + item.id}
                            title={item.title}
                        ></ShopItem>
                    );
                })}
            </ul>
        </section>
    );
};

export default Shop;
