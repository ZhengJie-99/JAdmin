import { renderIcon } from '/@/utils/index'
export default {
    path: '/user',
    name: 'User',
    redirect: '/userinfo',
    icon: renderIcon('ph:user-circle'),
    meta: {
        title: '用户中心',
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
        name: 'https://www.naiveui.com/zh-CN/dark',
        meta: {
            title: "Naive UI"
        }
    }]
};

