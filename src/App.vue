<script lang='ts' setup>
import { darkTheme, useOsTheme } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import AppLication from '/@/components/Application/index.vue'
import { useAppStore } from '/@/store/app'


const store = useAppStore()

// 获取操作系统主题
const osThemeRef = useOsTheme()
const theme = computed(() => {
    store.theme = osThemeRef.value
    return osThemeRef.value === 'dark' ? darkTheme : null
})
</script>

<template>
    <n-config-provider :theme="theme" :locale="zhCN" :date-locale="dateZhCN">
        <n-global-style />
        <AppLication>
            <RouterView v-slot="{ Component, route }" :key="store.currentRouterViewKey">
                <Transition mode="out-in" appear>
                    <KeepAlive v-if="!route.meta.closekeepAlive">
                        <component :is="Component"></component>
                    </KeepAlive>
                    <component v-else :is="Component"></component>
                </Transition>
            </RouterView>
        </AppLication>
    </n-config-provider>
</template>

<style lang="less" scoped>
:deep(.n-layout-scroll-container) {
    display: flex;
    flex-direction: column;
}
</style>