import router from '/@/router';
type stateModel = {
    name: string;
    title: string;
};
export const useTagState = createGlobalState(() => {
    const state = ref<stateModel[]>([{
        name: "Home",
        title: "首页"
    }])
    // 添加Tag
    function addTagView(name: string, title: string) {
        let isExist = state.value.some((v) => v.name == name)
        if (!isExist) {
            state.value.push({ name, title })
        }
    }

    // 移除Tag
    function removeTagView(currentTag: stateModel, type: number = 2) {
        switch (type) {
            case 2:
                // 关闭当前
                state.value.find((v, index) => {
                    try {
                        if (v.name == currentTag.name) {
                            state.value.splice(index, 1)
                            router.replace({ name: 'Home' })
                        }
                    } catch (error) {
                    }
                })
                break;
            // 关闭其他
            case 3:
                if (currentTag.name == "Home") {
                    state.value = [currentTag]
                } else {
                    state.value = [{
                        name: "Home",
                        title: "首页"
                    }, currentTag]
                }
                router.replace({ name: currentTag.name });
                break;
            // 关闭全部
            case 4:
                state.value = [{
                    name: "Home",
                    title: "首页"
                }]
                router.replace({ name: 'Home' });
                break;
            default:
                break;
        }

    }

    return { state: useStorage('tagViewList', state), addTagView, removeTagView }
});