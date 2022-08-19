import { defineStore } from 'pinia'
import { store } from '/@/store'

export type appState = {
    currentRouterViewKey: number;
    theme: string | null;
};

export const useAppStore = defineStore({
    id: 'app',
    state: (): appState => ({
        currentRouterViewKey: new Date().getTime(),
        theme: 'dark'
    }),
    getters: {
    },
    actions: {
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
