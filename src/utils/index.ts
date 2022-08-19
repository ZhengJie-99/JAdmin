/**
 * render 图标
 * */
export function renderIcon(icon: string) {
    return () => h('span', { class: 'iconify', 'data-icon': icon })
}