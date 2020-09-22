import Designer from '../views/Designer';

export default [
  {
    path: '/',
    redirect:'/designer'
  },
  {
    path: '*',
    redirect:'/designer'
  },
  {
    path: '/designer',
    name: 'designer',
    component: Designer,
    children: [
      /**
       * 所有设计器产生的页面都在这个下面
       */
    ]
  }
];