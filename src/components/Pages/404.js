import React from 'react';
import { Layout, Row, Col } from 'antd';
const { Content } = Layout;

export default () => (
  <Layout className="full-layout page404">
    <Content>
        <Row className="error-block" type="flex" justify="center" align="middle" gutter={16}>
            <Col>
                <div className="center-block">
                    <h1 className="error-title"> 404! </h1>
                    <h2 className="error-subtitle">未找到相应的资源...</h2>
                </div>
            </Col>
        </Row>
    </Content>
  </Layout>
);
