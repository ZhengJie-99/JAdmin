<script lang='ts' setup>
import Siders from '/@/layouts/siders/index.vue'
import Header from '/@/layouts/header/index.vue'
import Footer from '/@/layouts/footer/index.vue'

</script>

<template>
    <n-loading-bar-provider>
        <n-notification-provider>
            <n-layout has-sider embedded position="absolute">
                <Siders />
                <n-layout>
                    <Header />
                    <n-layout-content content-style="padding: 8px 16px;" class="flex-1">
                        <slot name="default"></slot>
                    </n-layout-content>
                    <Footer />
                </n-layout>
            </n-layout>
        </n-notification-provider>
    </n-loading-bar-provider>
</template>

<style lang="less" scoped>
:deep(.n-layout-scroll-container) {
    display: flex;
    flex-direction: column;
}
</style>