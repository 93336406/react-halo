import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;

@connect()
export default class EventMonitor extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout">
        <Content>事件监控</Content>
      </Layout>
    );
  }
}
