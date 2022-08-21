<script lang='ts' setup>
import { MenuInst } from 'naive-ui'


// 路由数据
const currentRoute = useRoute();
const router = useRouter()

// Menu数据
const menuInstRef = ref<MenuInst | null>(null)
const generator: any = (routerMap) => {
    return routerMap.map((item) => {
        const currentMenu = {
            ...item,
            label: item.meta.title,
            key: item.name,
            show: item.meta.show
        };
        if (item.children && item.children.length > 0) {
            currentMenu.children = generator(item.children);
        }
        return currentMenu;
    });
};
const breadcrumbList = computed(() => {
    let list = generator(router.options.routes)
    // 移除设置为false的选项
    // 原因：当前框架设置show为false 出现BUG
    // 待官方解决此问题删除即可
    // 只验证第一层级
    list.forEach((item, index) => {
        if (item.show === false) {
            delete list[index]
        }
    });
    return list
});


// 跟随页面路由变化，切换菜单选中状态
const currentPath = ref()
watch(
    () => currentRoute.fullPath,
    () => {
        currentPath.value = currentRoute.name
        menuInstRef.value?.showOption(currentPath.value)
    }
);

// 切换路由
function clickMenuItem(key: string) {
    if (/http(s)?:/.test(key)) {
        window.open(key);
    } else {
        router.push({ name: key });
    }
}



</script>

<template>
    <n-layout-sider content-style="padding: 10px 0;" show-trigger="bar" :collapsed-width="0" width="200"
        :trigger-style="{ right: '-24px' }">
        <div class="logo"><img src="/@/assets/JAdmin.png" /></div>
        <n-menu ref="menuInstRef" :options="breadcrumbList" accordion :value="currentPath"
            @update:value="clickMenuItem" />
    </n-layout-sider>
</template>

<style lang='less' scoped>
.logo {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;

    img {
        width: 80%;
    }
}
</style>