<script lang='ts' setup>
import { serve } from '/@/utils/http'
const loading = ref<boolean>(false)
const formatted = useDateFormat(useNow(), 'YYYY-MM-DD HH:mm:ss')

serve.request({
    url: '/test',
    method: 'get',
    params: {
        id: 13
    }
}).then((res)=> {
    console.log(res);
})

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