import axios from '../utils/request'

// 系统登录的接口
export function loginFn(data: {adminname: string, password: string}){

    return axios({
        url: '/admin/login',
        data,
        method: 'post'
    })
}