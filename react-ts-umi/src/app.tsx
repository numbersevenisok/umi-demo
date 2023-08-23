import React from 'react';
import {
  BasicLayoutProps,
  Settings as LayoutSettings,
} from '@ant-design/pro-layout';
import './index.less'
import Header from './components/Header';
/* layout是页面布局，分为三个部分 */
export const layout = (): BasicLayoutProps => {
  return {
    rightContentRender: () => <Header/>,
    footerRender: () => <div>用于进行笔试测试的基于umi的demo</div>,
    onPageChange: () => {
    }
  };
};