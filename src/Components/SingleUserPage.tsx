import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { User } from '../types';

const SingleUserPage = () => {
    const [user, setUser] = useState<null | User>(null);
    const params = useParams();

    useEffect(() => {
        fetch(`http://localhost:3009/users/id/${params.id}`)
            .then((res) => res.json())
            .then((server) => (server ? setUser(server) : null));
    }, []);

    if (!user) return <h1>Loading...</h1>;
    return <h1>Hello {user.name}</h1>;
};

export default SingleUserPage;
