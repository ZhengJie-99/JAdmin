import { JAxios } from "./createAxios"

// 请求方式
export enum ContentTypeEnum {
    // json
    JSON = 'application/json;charset=UTF-8',
    // form-data qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data  
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}


function createAxios() {
    return new JAxios({
        baseURL: import.meta.env.VITE_GLOB_API_URL,
        timeout: 10 * 1000,
        headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED }
    })
}

export const serve = createAxios()