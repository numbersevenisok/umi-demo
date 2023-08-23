/*
    为什么要二次封装：
    1. 因为我们请求的时候要给请求的域名或者叫 ip 地址，该地址可能后期会发生改变
    那么如果不封装就会导致很多地方需要手动进行修改，太过于麻烦，我们封装之后只需要
    修改一个地方即可。
    2. 因为我们的各种请求传参方式不一样，传参方式要统一，这样我们使用起来就会更方便
*/ 

import axios from "axios";

import type {AxiosInstance} from 'axios'

// 开发环境（写代码阶段）development         
// baseURL 设置为公司同事的服务器地址(你后端程序员同事电脑地址)

// 生产环境（代码部署之后）production
// baseURL 设置为阿里云或者百度云服务器地址，也就是线上服务器地址

// 测试环境（代码写完没有部署）production
// baseURL 设置为阿里云或者百度云服务器地址，也就是线上服务器地址


// const isDev = process.NODE_ENV === 'development'

const request: AxiosInstance = axios.create({
    // baseURL: isDev ? '写的是后端程序员给的地址' : '线上服务器地址'
    // baseURL: isDev ? 'http://10.31.169.92:3000/admin' : 'http://121.89.205.189:3000/admin'

    baseURL: 'http://121.89.205.189:3000/admin',
    // 配置的是请求超时时间
    timeout: 60000
})

// 请求拦截器
request.interceptors.request.use(function(config){
    
    // 在数据请求发送之前会先进入请求拦截器
    // 因为 token 是很多接口都需要的一个头部参数
    // 所以我们可以在发生数据请求前配置好 token 
    // console.log(localStorage.getItem('token'));
    // 取出本地存储的 token 
    const token = localStorage.getItem('token')
    // console.log(config);

    // 在请求的头部设置一个 token
    config.headers.token = token

    return config
},(err)=>{
    // 对请求错误做些什么
    return Promise.reject(err)
})

// 响应拦截器
request.interceptors.response.use(function(response){

    // console.log(response.data);
    if(response.data.code === '10119'){
        // token 无效的处理
        localStorage.clear()

        // 重新进入到登录页面
        window.location.href = '/#/login'
    }

    return response.data
},function(err){
     // 对请求错误做些什么,超出 2xx 范围的状态吗都会触发该函数
     return Promise.reject(err)
})

interface IConfig {
    url: string
    method?: string
    data?: any
    headers?: any
}

// 封装各种数据请求方法
export default function ajax(config: IConfig){
    // 1. 先获取到请求的一些必要参数
    const {url = '', method = 'GeT', data = {}, headers = {}} = config

    // 2. 判断请求的类型

    switch (method.toUpperCase()) {
        case 'GET':
            return request.get(url, {params: data})
        case 'POST':
            // POST 请求的时候需要先判断当前的数据是什么类型
            // 1. 数据是通过 表单提交的
            if(headers['content-type'] === 'application/x-www-form-url-encoded'){
                // 将参数格式化一下
                const obj = new URLSearchParams()
                for (const key in data) {
                    obj.append(key, data[key])
                }
                return request.post(url, obj, {headers})
            }
            // 2. 数据为文件数据
            if(headers['content-type'] === 'multipart/form-data'){
                const obj = new FormData()
                for (const key in data) {
                    obj.append(key, data[key])
                }
                return request.post(url, obj, {headers})
            }
            // 3. json 数据
            return request.post(url, data)

        case "PUT":
            // 修改数据 --- 数据更新用的
            return request.put(url, data)

        case "DELETE":
            // 删除数据
            return request.delete(url, {data})

        case 'PATCH':
            // 更新局部资源
            return request.patch(url, data)
        default:
            // 如果前面都不是的情况下
            return request.request(config)
    }

}