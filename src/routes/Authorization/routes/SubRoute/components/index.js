import React from 'react';
import {connect} from 'dva';
import {Layout} from 'antd';
import intl from 'react-intl-universal';
import BaseComponent from 'components/BaseComponent';
import './index.less';

const {Content} = Layout;

@connect()
export default class extends BaseComponent {
    render() {
        return (
            <Layout className="full-layout page level2-route-page">
                <Content>
                    <h2>{intl.get("authorization.user.base.detail")}</h2>
                </Content>
            </Layout>
        );
    }
}
