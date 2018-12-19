import React, {Component} from 'react';
import {connect} from 'dva';
import {Form, Layout, Button, Icon, Input, Spin, Select} from 'antd';
import shortLogo from 'assets/images/logo_short.png';
import './index.less';

const {Content, Footer} = Layout;
const FormItem = Form.Item;

@connect(({login, loading}) => ({
    login,
    loading: loading.models.login
}))
class Login extends Component {
    handleSubmit = e => {
        const {form, dispatch} = this.props;
        e.preventDefault();
        form.validateFields((err, values) => {
            if (!err) {
                console.log(values);
                dispatch({
                    type: 'login/login',
                    payload: values
                });
            }
        });
    };

    render() {
        const {loading, form} = this.props;
        const {getFieldDecorator} = form;
        return (
            <Layout className="full-layout login-page">
                <Content className="login-form-box">
                    <Spin tip="登录中..." spinning={!!loading}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className="user-img">
                                <img src={shortLogo} alt=""/>
                                <b>HALO</b>
                                <span>v2.0</span>
                            </div>
                            <FormItem className="form-item">
                                {getFieldDecorator('workspace', {
                                    initialValue: '',
                                    rules: [{required: false, message: '请输入工作区,示例cddev'}]
                                })(
                                    <Select
                                        size="large"
                                        prefix={<Icon type="switcher"/>}
                                        placeholder="工作区"
                                    />
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                {getFieldDecorator('userName', {
                                    initialValue: 'admin',
                                    rules: [{required: true, message: '请输入您的用户名，示例admin'}]
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="user"/>}
                                        placeholder="用户名"
                                    />
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                {getFieldDecorator('password', {
                                    initialValue: 'admin',
                                    rules: [{required: true, message: '请输入您的密码，示例admin'}]
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="lock"/>}
                                        type="password"
                                        placeholder="密码"
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    className="login-form-button"
                                >
                                    登录
                                </Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Content>
                <Footer style={{textAlign: 'center',backgroundColor:'rgba(255,255,255,0)'}}>
                    HALO © 2018 Capital Crux
                </Footer>
            </Layout>
        );
    }
}

export default Form.create()(Login);
