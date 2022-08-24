<script lang='ts' setup>
import { useLoadingBar, useNotification } from 'naive-ui'
import tagView from './components/tagView.vue'

// 路由数据
const router = useRouter();
const route = useRoute()

// 面包屑
const generator: any = (routerMap) => {
    return routerMap.map((item) => {
        const currentMenu = {
            ...item,
            label: item.meta.title,
            key: item.name,
            ...item.meta
            // disabled: item.path === '/',
        };
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentMenu.children = generator(item.children);
        }
        return currentMenu;
    });
};
const breadcrumbList = computed(() => {
    return generator(route.matched);
});

// 面包屑跳转
const dropdownSelect = (key: string) => {
    router.push({ name: key });
};

// 个人中心
const username = "JAdmin"
const avatarOptions = [
    {
        label: '个人设置',
        key: 1,
    },
    {
        label: '退出登录',
        key: 2,
    },
];

// 全屏
const { toggle } = useFullscreen()


onMounted(() => {
    // 挂载loading
    window['$loading'] = useLoadingBar();
    // 挂载消息提示
    window['$notification'] = useNotification();
})
</script>

<template>
    <n-layout-header class="py-10px px-12px">
        <n-space justify="space-between">
            <!-- 面包屑 -->
            <n-breadcrumb>
                <template v-for="routeItem in breadcrumbList" :key="routeItem.name">
                    <n-breadcrumb-item>
                        <n-dropdown v-if="routeItem.children.length" :options="routeItem.children"
                            @select="dropdownSelect" :show-arrow="true">
                            <span>
                                {{ routeItem.meta.title }}
                            </span>
                        </n-dropdown>
                        <span v-else>
                            {{ routeItem.meta.title }}
                        </span>
                    </n-breadcrumb-item>
                </template>
            </n-breadcrumb>

            <!-- 个人中心 -->
            <div class="flex items-center">
                <n-space>
                    <div class="cursor-pointer h-7 leading-7 flex items-center text-16px" @click="toggle">
                        <span @click="toggle()" class="iconify" data-icon="radix-icons:enter-full-screen"
                            data-inline="false"></span>
                    </div>
                    <n-dropdown trigger="click" :options="avatarOptions" :show-arrow="true">
                        <div class="avatar flex items-center cursor-pointer">
                            <n-avatar round size="small">
                                {{ username }}
                            </n-avatar>
                        </div>
                    </n-dropdown>
                </n-space>
            </div>
        </n-space>
    </n-layout-header>
    <tagView />
</template>