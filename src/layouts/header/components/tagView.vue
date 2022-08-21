<script lang='ts' setup>
import { useAppStore } from '/@/store/app'
import { renderIcon } from '/@/utils/index'
import { useTagState } from '/@/storage/tagState'

// store 
const store = useAppStore()

// globalState
const { state, addTagView, removeTagView } = useTagState()

// 路由
const router = useRouter()
const currentRoute = useRoute()

// 监听路由变化
const currentPath = ref()
const currentTitle = ref()
watch(
    () => currentRoute.fullPath,
    () => {
        currentPath.value = currentRoute.name
        currentTitle.value = currentRoute.meta.title
        // 排除隐藏路由
        if (currentRoute.meta.show !== false) {
            addTagView(currentPath.value, currentTitle.value)
        }
    }
);


// 右键弹框
const tagConfig = ref([
    {
        label: '刷新页面',
        key: 1,
        icon: renderIcon('majesticons:reload-line')
    },
    {
        label: '关闭当前',
        key: 2,
        icon: renderIcon('material-symbols:close-rounded'),
        disabled: false
    },
    {
        label: '关闭其他',
        key: 3,
        icon: renderIcon('mdi:close-circle-multiple-outline')
    },
    {
        label: '关闭全部',
        key: 4,
        icon: renderIcon('mdi:progress-close')
    }
])
const xRef = ref(0)
const yRef = ref(0)
const showDropdownRef = ref(false)
const currentTagView = ref()

// select
function handleSelect(key: number) {
    showDropdownRef.value = false
    if (key == 1) {
        store.reload()
    } else {
        removeTagView(currentTagView.value, key)
    }
}

// 弹框点击空白处
function onClickoutside() {
    showDropdownRef.value = false
}

// 弹窗打开位置
function handleContextMenu(e: MouseEvent, key: any) {
    tagConfig.value[1].disabled = key.name == "Home" ? true : false
    e.preventDefault()
    showDropdownRef.value = false
    nextTick().then(() => {
        currentTagView.value = {
            name: key.name,
            title: key.title
        }
        showDropdownRef.value = true
        xRef.value = e.clientX
        yRef.value = e.clientY
    })
}
</script>

<template>
    <n-space warp class="px-16px pt-8px">
        <n-tag v-for="(item, index) in state" :key="index" size="large" :closable="item.name != 'Home' ? true : false"
            :color="{ color: store.theme === 'dark' ? '#18181c' : 'null' }" :bordered="false"
            @close.stop="removeTagView(item)" @click="router.push({ 'name': item.name })"
            @contextmenu="handleContextMenu($event, item)">
            <n-el :class="{ tag_el: true, 'text-blue-500/80': item.name == currentPath ? true : false }" tag="span">
                {{ item.title }}
            </n-el>
        </n-tag>
    </n-space>
    <!-- 右键弹框 -->
    <n-dropdown placement="bottom-start" trigger="manual" :x="xRef" :y="yRef" :options="tagConfig"
        :show="showDropdownRef" :on-clickoutside="onClickoutside" @select="handleSelect" />
</template>


<style lang='less' scoped>
.tag_el {
    padding: 0 5px;
}

.n-tag {
    cursor: pointer;
}
</style>