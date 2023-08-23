import React from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';

import { loginFn } from '@/api/user';

import { connect } from 'umi';

import { Dispatch } from 'dva';

import './index.less'

interface iProps {
  dispatch: Dispatch
}

const App: React.FC<iProps> = ({dispatch}: iProps) => {

  const onFinish = (values: any) => {
    // loginFn(values).then(res => {
    //   console.log(res);
    // })

    // 触发在模块中定义的异步请求方法
    dispatch({
      type: 'admin/loginAction',
      payload: values
    })
  };

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}
      onFinish={onFinish}
    >
      <Form.Item
        name="adminname"
        rules={[{ required: true, message: '请输入管理员账号!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="管理员账号" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: '请输入管理员密码!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="管理员密码"
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );
};

export default connect()(App);