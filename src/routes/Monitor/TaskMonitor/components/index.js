import React from 'react';
import {connect} from 'dva';
import {Layout, Input, Icon} from 'antd';
import intl from 'react-intl-universal';
import BaseComponent from 'components/BaseComponent';

const {Content} = Layout;

function ppHOC(WrappedComponent) {
    return class PP extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                name: 'qq'
            };
            this.onNameChange = this.onNameChange.bind(this)
        }

        onNameChange(event) {
            this.setState({
                name: event.target.value
            })
        }

        proc(TaskMonitor) {
            TaskMonitor && TaskMonitor.setValue(this.state.name);
        }

        render() {
            const newProps = {
                name: {
                    value: this.state.name,
                    prefix: (<Icon type="user" style={{color: 'rgba(0,0,0,.25)'}}/>),
                    onChange: this.onNameChange
                }
            };
            const props = Object.assign({}, newProps, {ref: this.proc.bind(this)});
            return <WrappedComponent {...this.props} {...props}/>
        }
    }
}

@connect()
@ppHOC
export default class TaskMonitor extends BaseComponent {
    state = {
        name: ""
    };
    setValue = (v) => {
        this.setState({name: v});
    };

    render() {
        return (
            <Layout className="full-layout">
                <Content style={{padding: "16px"}}>
                    <Input name="name" size="large" placeholder="input with clear icon" {...this.props.name} />
                    <Input readOnly defaultValue={this.state.name}/>
                </Content>
            </Layout>
        );
    }
}
