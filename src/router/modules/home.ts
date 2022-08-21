import { renderIcon } from '/@/utils/index'
export default {
    path: '/',
    name: 'Root',
    redirect: '/home',
    icon: renderIcon('ant-design:dashboard-outlined'),
    meta: {
        title: '监控台',
    },
    children: [{
        path: '/home',
        name: 'Home',
        component: () => import('/@/views/home/index.vue'),
        meta: {
            title: "首页"
        }
    }, {
        path: '/test2',
        name: 'Test2',
        component: () => import('/@/views/test2/index.vue'),
        meta: {
            title: "测试2"
        }
    }, {
        path: '/test3',
        name: 'Test3',
        component: () => import('/@/views/test2/test3.vue'),
        meta: {
            title: 'Test3',
        },
    }]
};

