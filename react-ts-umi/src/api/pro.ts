import ajax from "@/utils/request";

// 获取商品列表数据的请求
export function getProList(){
    return ajax({
        url: '/pro/list'
    })
}