export default {
    path: '/:catchAll(.*)',
    name: 'Error',
    meta: {
        show: false,
        title: 'Error',
    },
    component: () => import("/@/views/sys/error.vue")
}