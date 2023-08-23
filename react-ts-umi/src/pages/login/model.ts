// 状态模块

import { Effect, ImmerReducer, history  } from 'umi';
import { loginFn } from '@/api/user';

import {message} from 'antd'

// 定义全局状态中的数据类型
export interface AdminModelState {
  adminname: string
  role: number
  token: string
  checkedkeys: string[]
  loginState: boolean
}

export interface AdminModelType {
  namespace: 'admin';
  state: AdminModelState;
  effects: {
    loginAction: Effect;
  };
  reducers: {
    // save: Reducer<AdminModelState>;
    // 启用 immer 之后
    CHANGE_INFO: ImmerReducer<AdminModelState>;
  };
}

const IndexModel: AdminModelType = {
  namespace: 'admin',

  state: {
    adminname: localStorage.getItem('adminname') || '',
    token: localStorage.getItem('token') || '',
    role: Number(localStorage.getItem('role')) || 1,
    checkedkeys: JSON.parse(localStorage.getItem('checkedkeys') as string) || [],
    loginState: localStorage.getItem('loginState') === 'true'
  },

  effects: {
    *loginAction({ payload }, { call, put }): any {
        // 登录接口应该在此处进行调用
        const res = yield call(loginFn, payload)
        // console.log(res);
        if(res.code === '10003'){
            // 密码错误
            message.error('温馨提示：' + res.message)
        }else if(res.code === '10005'){
            // 未注册
            message.error('温馨提示：' + res.message)
        }else if(res.code === '200') {
            // 登录成功
            message.success('💐恭喜你登录成功💐')
            res.data.loginState = true

            yield put({
                type: 'CHANGE_INFO',
                payload: res.data
            })
        }
        
    },
  },
  reducers: {
    // save(state, action) {
    //   return {
    //     ...state,
    //     ...action.payload,
    //   };
    // },
    // 启用 immer 之后
    CHANGE_INFO(state, action) {

      // 登录成功之后的处理
      // 将登录后的数据保存在本地
      localStorage.setItem('adminname', action.payload.adminname)
      localStorage.setItem('role', action.payload.role)
      localStorage.setItem('token', action.payload.token)
      localStorage.setItem('checkedkeys', JSON.stringify(action.payload.checkedkeys))
      localStorage.setItem('loginState', action.payload.loginState)

      // 将登录成功之后的数据保存在状态管理中
      state.adminname = action.payload.adminname
      state.role = action.payload.role
      state.token = action.payload.token
      state.checkedkeys = action.payload.checkedkeys
      state.loginState = action.payload.loginState

      // 跳转到首页
      history.push('/')

    },
  }
};

export default IndexModel;
