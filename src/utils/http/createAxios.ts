import type { AxiosInstance } from 'axios'
import axios from 'axios'
import qs from 'qs'

export class JAxios {
    private axiosInstance: AxiosInstance;

    constructor(options) {
        this.axiosInstance = axios.create(options);
        this.setupInterceptors();
    }

    private setupInterceptors() {
        this.axiosInstance.interceptors.request.use(function (config: any) {
            window['$loading'].start();
            config.headers.apifoxToken = "nJE1Kd7VzLtqfonHjpNkTyHmDHpNOUSu"
            config.data = qs.stringify(config.data)
            return config;
        }, function (error) {
            window['$loading'].finish();
            return Promise.reject(error);
        });

        this.axiosInstance.interceptors.response.use(function (response) {
            window['$loading'].finish();
            return response.data;
        }, function (error) {
            window['$loading'].finish();
            return Promise.reject(error);
        });

    }

    request(config) {
        return new Promise((resolve, reject) => {
            this.axiosInstance
                .request(config)
                .then((res) => {
                    resolve(res);
                })
                .catch((error) => {
                    if (error.response) {
                        this.checkStatus(`错误代码: ${error.response.status}, 请联系系统管理员`)
                    } else if (error.request) {
                        this.checkStatus(`请求超时, 请联系系统管理员`)
                    } else {
                        this.checkStatus(`Error: ${error.message}`)
                        console.log('Error', error.message);
                    }
                    reject(error);
                });
        });
    }

    private checkStatus(msg: string) {
        window['$notification'].error({
            content: '错误提示',
            meta: msg,
            duration: 2500,
            keepAliveOnHover: true
        });
    }
}