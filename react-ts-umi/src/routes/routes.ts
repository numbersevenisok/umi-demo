
interface IRoute {
    path: string
    component?: string
    redirect?: string
    exact?: boolean
    name?: string
    menuRender?: boolean
    headerRender?: boolean
    footerRender?: boolean
    routes?: IRoute[]
    icon?: string
}

const routes: IRoute[] = [
    // redirect 配置路由重定向
    // exact 精确匹配
    { path: '/', redirect: '/home', exact: true },
    {
        path: '/home',
        component: '@/pages/home/index',
        name: '系统首页',
        icon: 'user'
    }
    ,{
        path: '/login',
        component: '@/pages/login/index',
        menuRender: false, // 配置不显示侧边栏
        headerRender: false,
        footerRender: false,
    },{
        path: '/banner',
        name: '轮播图管理',
        icon: 'wifi', 
        routes: [
            {
                path: '/banner/list',
                component: '@/pages/banner/index',
                name: '轮播图列表'
            },
            {
                path: '/banner/add',
                component: '@/pages/banner/add',
                name: '添加轮播图'
            }
        ]
    },{
        path: '/pro',
        name: '产品管理',
        routes: [
            {
                path: '/pro/list',
                name: '产品列表',
                component: '@/pages/pro/index'
            },
            {
                path: '/pro/search',
                name: '筛选列表',
                component: '@/pages/pro/search'
            }
        ]
    }
  ]

  export default routes