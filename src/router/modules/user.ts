import { renderIcon } from '/@/utils/index'
export default {
    path: '/user',
    name: 'User',
    redirect: '/userinfo',
    meta: {
        title: '用户中心',
        icon: renderIcon('ph:user-circle')
    },
    children: [{
        path: '/userinfo',
        name: 'UserInfo',
        component: () => import('/@/views/user/index.vue'),
        meta: {
            title: "用户信息"
        }
    }, {
        path: '/naive-ui',
        name: 'https://www.naiveui.com/zh-CN/dark/docs/installation',
        meta: {
            title: "Naive UI"
        }
    }]
};

