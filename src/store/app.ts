import { defineStore } from 'pinia'
import { store } from '/@/store'
import router from '/@/router';

export type appState = {
    currentRouterViewKey: number;
    theme: string | null;
    tagViewList: any[];
};

export const useAppStore = defineStore({
    id: 'app',
    state: (): appState => ({
        currentRouterViewKey: new Date().getTime(),
        theme: 'dark',
        tagViewList: [{
            name: "Home",
            title: "首页"
        }]
    }),
    getters: {
    },
    actions: {
        // 初始化
        initTagViewList() {
            let localTagViewList: any = localStorage.getItem("tagViewList")
            if (!localTagViewList) {
                localTagViewList = this.tagViewList
                localStorage.setItem("tagViewList", JSON.stringify(localTagViewList))
            } else {
                localTagViewList = JSON.parse(localTagViewList)
                this.tagViewList = localTagViewList
            }
        },
        // 添加
        addTagView(name: string, title: string) {
            let isExist = this.tagViewList.some((v) => v.name == name)
            if (!isExist) {
                this.tagViewList.push({ name, title })
                localStorage.setItem("tagViewList", JSON.stringify(this.tagViewList))
            }
        },
        /**
        * @description 删除tag
        * @params name 关闭项 title 标题  type 关闭类型
        * @params type 2 关闭当前
        * @params type 3 关闭其他
        * @params type 4 关闭全部
        */
        removeTagView(currentTag, type: number = 2) {
            switch (type) {
                case 2:
                    // 关闭当前
                    this.tagViewList.find((v, index) => {
                        try {
                            if (v.name == currentTag.name) {
                                this.tagViewList.splice(index, 1)
                                localStorage.setItem("tagViewList", JSON.stringify(this.tagViewList))
                                router.replace({ name: 'Home' })
                            }
                        } catch (error) {
                        }
                    })
                    break;
                // 关闭其他
                case 3:
                    if (currentTag.name == "Home") {
                        this.tagViewList = currentTag
                    } else {
                        this.tagViewList = [{
                            name: "Home",
                            title: "首页"
                        }, currentTag]
                    }
                    localStorage.setItem("tagViewList", JSON.stringify(this.tagViewList))
                    router.replace({ name: currentTag.name });
                    break;
                // 关闭全部
                case 4:
                    this.tagViewList = [{
                        name: "Home",
                        title: "首页"
                    }]
                    localStorage.setItem("tagViewList", JSON.stringify(this.tagViewList))
                    router.replace({ name: 'Home' });
                    break;
                default:
                    break;
            }

        },
        // 更新Key 促使Dom重新渲染
        reload() {
            this.currentRouterViewKey = new Date().getTime()
        }
    },
})

// Need to be used outside the setup
export function useAppStoreWithOut() {
    return useAppStore(store);
}
