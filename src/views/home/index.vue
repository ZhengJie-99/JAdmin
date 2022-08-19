<script lang='ts' setup>
const loading = ref<boolean>(false)
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')
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
            </template>
        </n-card>
    </div>
</template>

<style lang='less' scoped>
</style>