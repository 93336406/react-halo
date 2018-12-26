import React, {Component} from 'react';
import {connect} from 'dva';
import intl from 'react-intl-universal';
import {Form, Layout, Button, Icon, Input, Spin} from 'antd';
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
                    <Spin tip={intl.get("login...")} size="large" spinning={!!loading}>
                        <Form onSubmit={this.handleSubmit} className="login-form">
                            <div className="user-img">
                                <img src={shortLogo} alt=""/>
                                <b>HALO</b>
                                <span>v2.0</span>
                            </div>
                            <FormItem className="form-item">
                                {getFieldDecorator('workspace', {
                                    initialValue: '',
                                    rules: [{required: false, message: intl.get("workspaceTip")}]
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="switcher"/>}
                                        placeholder={intl.get("workspace")}
                                    />
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                {getFieldDecorator('userName', {
                                    initialValue: 'admin',
                                    rules: [{required: true, message: intl.get("accountTip")}]
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="user"/>}
                                        placeholder={intl.get("account")}
                                    />
                                )}
                            </FormItem>
                            <FormItem className="form-item">
                                {getFieldDecorator('password', {
                                    initialValue: 'admin',
                                    rules: [{required: true, message: intl.get("passwordTip")}]
                                })(
                                    <Input
                                        size="large"
                                        prefix={<Icon type="lock"/>}
                                        type="password"
                                        placeholder={intl.get("password")}
                                    />
                                )}
                            </FormItem>
                            <FormItem>
                                <Button
                                    size="large"
                                    type="primary"
                                    htmlType="submit"
                                    loading={!!loading}
                                    className="login-form-button"
                                >
                                    {intl.get("login")}
                                </Button>
                            </FormItem>
                        </Form>
                    </Spin>
                </Content>
                <Footer style={{textAlign: 'center', backgroundColor: 'rgba(255,255,255,0)'}}>
                    HALO © 2018 Capital Crux
                </Footer>
            </Layout>
        );
    }
}

export default Form.create()(Login);
