<script lang='ts' setup>
import { darkTheme, useOsTheme } from 'naive-ui'
import { zhCN, dateZhCN } from 'naive-ui'
import { useAppStore } from '/@/store/app'
import Siders from '/@/layouts/siders/index.vue'
import Header from '/@/layouts/header/index.vue'
import Footer from '/@/layouts/footer/index.vue'

// store
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
        <n-loading-bar-provider>
            <n-notification-provider>
                <n-layout has-sider embedded position="absolute">
                    <Siders />
                    <n-layout>
                        <Header />
                        <n-layout-content content-style="padding: 8px 16px;" class="flex-1">
                            <RouterView v-slot="{ Component, route }" :key="store.currentRouterViewKey">
                                <Transition mode="out-in" appear>
                                    <KeepAlive v-if="!route.meta.closekeepAlive">
                                        <component :is="Component"></component>
                                    </KeepAlive>
                                    <component v-else :is="Component"></component>
                                </Transition>
                            </RouterView>
                        </n-layout-content>
                        <Footer />
                    </n-layout>
                </n-layout>
            </n-notification-provider>
        </n-loading-bar-provider>
    </n-config-provider>
</template>

<style lang="less" scoped>
:deep(.n-layout-scroll-container) {
    display: flex;
    flex-direction: column;
}
</style>