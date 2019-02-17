import React from 'react'
import Loadable from "react-loadable"

let config = [
    {
        name: '/',
        path: '/',
        exact: true,
        component: Loadable({
            loader: () => import('../components/articles/articles.js'),
            loading: () => <div />
        })
    },
    {
        name: 'home',
        path: '/home',
        exact: true,
        component: Loadable({
            loader: () => import('../components/articles/articles.js'),
            loading: () => <div />
        })
    },
    {
        name: 'hot',
        path: '/hot',
        exact: true,
        component: Loadable({
            loader: () => import('../components/articles/articles.js'),
            loading: () => <div />
        })
    },
    {
        name: 'timeLine',
        path: '/timeLine',
        exact: true,
        component: Loadable({
            loader: () => import('../components/timeLine/timeLine.js'),
            loading: () => <div />
        })
    },
    {
        name: 'message',
        path: '/message',
        exact: true,
        component: Loadable({
            loader: () => import('../components/message/message.js'),
            loading: () => <div />
        })
    },
    {
        name: 'about',
        path: '/about',
        exact: true,
        component: Loadable({
            loader: () => import('../components/article/article.js'),
            loading: () => <div />
        })
    },
    {
        name: 'articleDetail',
        path: '/articleDetail',
        exact: true,
        component: Loadable({
            loader: () => import('../components/article/article.js'),
            loading: () => <div />
        })
    },
    {
        name: 'project',
        path: '/project',
        exact: true,
        component: Loadable({
            loader: () => import('../components/project/project.js'),
            loading: () => <div />
        })
    },
    
]

export default config