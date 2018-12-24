import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;

@connect()
export default class TaskMonitor extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout">
        <Content>任务监控</Content>
      </Layout>
    );
  }
}
