import React from 'react';
import {
  IconStorage,
  IconTags,
  IconHeart,
  IconUser,
  IconMessage,
  IconSettings,
  IconHome,
  IconHeartFill,
  IconBook,
} from '@arco-design/web-react/icon';

export const defaultRoute = 'categories';

export const routes = [
  {
    name: 'menu.articles',
    key: 'articles',
    icon: <IconBook />,
    componentPath: 'articles',
  },
  {
    name: '文章管理',
    key: 'articles/edit',
    icon: <IconBook />,
    componentPath: 'articles/edit',
    hide: true,
  },
  {
    name: 'menu.categories',
    key: 'categories',
    icon: <IconStorage />,
    componentPath: 'categories',
  },
  {
    name: 'menu.tags',
    key: 'tags',
    icon: <IconTags />,
    componentPath: 'tags',
  },
  {
    name: 'menu.abouts',
    key: 'about',
    icon: <IconHeart />,
    componentPath: 'about',
  },
  {
    name: 'menu.user',
    key: 'user',
    icon: <IconUser />,
    componentPath: 'user',
  },
  {
    name: 'menu.comment',
    key: 'comment',
    icon: <IconMessage />,
    componentPath: 'comment',
  },
  {
    name: 'menu.site',
    key: 'site',
    icon: <IconSettings />,
    children: [
      {
        name: '首页配置',
        key: 'home',
        icon: <IconHome />,
        componentPath: 'site/home',
      },
      {
        name: 'Header/Footer配置',
        key: 'hf',
        icon: <IconHeartFill />,
        componentPath: 'site/headerFooter',
      },
    ],
  },
];
