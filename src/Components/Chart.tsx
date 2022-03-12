import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'bottom' as const,
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

export function Chart() {
    const [posts, setPosts] = useState<any>([]);

    useEffect(() => {
        fetch(
            'https://jsonplaceholder.typicode.com/posts?_embed=comments&_expand=user'
        )
            .then((res) => res.json())
            .then((serverData) => setPosts(serverData));
    }, []);

    // const users = [...new Set(posts.map((post) => post.user.name))];
    const labels = [...new Set(posts.map((post: any) => post.user.name))];

    let users = labels.map((name) => {
        return posts.find((post: any) => post.user.name === name).user;
    });
    let data;
    
    data = {
        labels,
        datasets: [
            {
                label: 'Dataset 1',
                data: labels.map((name) => {
                    const foundUser = users.find((user) => user.name === name);
                    console.log(
                        posts.filter(
                            (post: any) => post.userId === foundUser?.id
                        ).length
                    );
                    return posts.filter(
                        (post: any) => post.userId === foundUser?.id
                    ).length;
                }),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Dataset 2',
                data: labels.map((name) => {
                    const foundUser = users.find((user) => user.name === name);
                    // console.log(
                    //     posts.filter(
                    //         (post: any) => post.userId === foundUser?.id
                    //     ).length
                    // );
                    const userPosts = posts.filter(
                        (post: any) => post.userId === foundUser?.id
                    );
                    return userPosts.map((post: any) => post.comments).length;
                }),
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };

    return <Bar options={options} data={data} />;
}
