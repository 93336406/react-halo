import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import intl from 'react-intl-universal';
import BaseComponent from 'components/BaseComponent';
const { Content } = Layout;

@connect()
export default class EventMonitor extends BaseComponent {
  render() {
    return (
      <Layout className="full-layout">
        <Content>{intl.get("monitor.eventMonitor")}</Content>
      </Layout>
    );
  }
}
