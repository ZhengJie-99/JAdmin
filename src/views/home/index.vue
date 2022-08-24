<script lang='ts' setup>
import { apiFoxApi } from '/@/api/demo'
const loading = ref<boolean>(false)
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')


async function test() {
    try {
        const data = await apiFoxApi({ id: 123 })
        console.log(data);
    } catch (error) {
    } finally {
        // console.log('finally');
    }
}
test()
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