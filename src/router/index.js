import React from 'react';
import Loadable from 'react-loadable';

const loadingComponent = ({ error, pastDelay }) => {
  if (error) {
    return <div>Error!</div>;
  } else if (pastDelay) {
    // return <div>Loading...</div>;
    return <div />;
  } else {
    return null;
  }
};

let config = [
  {
    name: '/',
    path: '/',
    exact: true,
    component: Loadable({
      loader: () => import('../components/home/index.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'articles',
    path: '/articles',
    exact: true,
    component: Loadable({
      loader: () => import('../components/articles/articles.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'hot',
    path: '/hot',
    exact: true,
    component: Loadable({
      loader: () => import('../components/articles/articles.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'archive',
    path: '/archive',
    exact: true,
    component: Loadable({
      loader: () => import('../components/archive/archive.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'timeLine',
    path: '/timeLine',
    exact: true,
    component: Loadable({
      loader: () => import('../components/timeLine/timeLine.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'message',
    path: '/message',
    exact: true,
    component: Loadable({
      loader: () => import('../components/message/message.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'about',
    path: '/about',
    exact: true,
    component: Loadable({
      loader: () => import('../components/article/article.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'articleDetail',
    path: '/articleDetail',
    exact: true,
    component: Loadable({
      loader: () => import('../components/article/article.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
  {
    name: 'project',
    path: '/project',
    exact: true,
    component: Loadable({
      loader: () => import('../components/project/project.js'),
      loading: loadingComponent,
      delay: 300,
    }),
  },
];

export default config;
