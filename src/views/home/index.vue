<script lang='ts' setup>
// import { useTagState } from '/@/useState/tagState'

const loading = ref<boolean>(false)
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

// 初始化tagView
// const state = useTagState()
</script>

<template>
    <div>
        <n-card>
            <template #header>
                <n-skeleton v-if="loading" text width="60%" />
                <template v-else>
                </template>
            </template>
            <n-skeleton v-if="loading" text :repeat="6" />
            <template v-else>
                {{ formatted }}
                <!-- {{ state[0].name }} -->
            </template>
        </n-card>
    </div>
</template>

<style lang='less' scoped>
</style>