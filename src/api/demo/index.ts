import { serve } from '/@/utils/http'
import { ApiFoxParams } from './model'


enum Api {
    Testpost = '/testpost',
}

/**
 * @description: ApiFox测试接口
 */
export function apiFoxApi(data: ApiFoxParams) {
    return serve.request({
        url: Api.Testpost,
        method: 'post',
        data
    })
}