import React from 'react';
import { connect } from 'dva';
import { Link, Switch } from 'dva/router';
import { Layout } from 'antd';
import intl from 'react-intl-universal';
import BaseComponent from 'components/BaseComponent';
import './index.less';
const { Content, Header } = Layout;

@connect()
export default class extends BaseComponent {
  render() {
    const {routerData} = this.props;
    const {childRoutes} = routerData;
    return (
      <Layout className="full-layout page level-route-page">
        <Header>
          <Link className="sub-route-link" to="/authorization/base" name="基本信息">{intl.get("authorization.user.base")}</Link>
          <Link className="sub-route-link" to="/authorization/group" name="用户组">{intl.get("authorization.user.group")}</Link>
        </Header>
        <Content>
          <Switch>{childRoutes}</Switch> 
        </Content>
      </Layout>
    );
  }
}
