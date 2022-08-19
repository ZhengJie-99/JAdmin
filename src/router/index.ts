import { createRouter, createWebHashHistory } from 'vue-router'

const routes: any[] = [];
const modules: Record<string, { [key: string]: any }> = import.meta.globEager('./modules/*.ts');

Object.keys(modules).forEach((key) => {
    const mod = modules[key].default || {};
    const modList = Array.isArray(mod) ? [...mod] : [mod];
    routes.push(...modList);
});


const router = createRouter({
    history: createWebHashHistory(),
    routes,
    strict: true,
    scrollBehavior: () => ({ left: 0, top: 0 }),
})

router.beforeEach((to, from, next) => {
    next()
})

export default router