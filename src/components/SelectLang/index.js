import React, {PureComponent} from 'react';
import {Menu, Icon} from 'antd';
import cx from 'classnames';
import HeaderDropdown from '../HeaderDropdown';
import './index.less';

export default class SelectLang extends PureComponent {
    changeLang = ({key}) => {
        localStorage.setItem("crux_local", key);
        window.location.reload();
    };
    state = {
        visible: false,
    };
    handleVisibleChange = visible => {
        this.setState({visible});
    };

    render() {
        const locales = ["en-US", "zh-CN"];
        const {visible} = this.state;
        const selectedLang = localStorage.getItem("crux_local") || locales[0];
        const languageLabels = {
            "en-US": "English",
            "zh-CN": "简体中文"
        };
        const languageIcons = {
            "zh-CN": "🇨🇳",
            "en-US": "🇬🇧"
        };
        const langMenu = (
            <Menu className={cx("menu")} selectedKeys={[selectedLang]} onClick={this.changeLang}>
                {locales.map(locale => (
                    <Menu.Item key={locale}>
                        <span role="img" aria-label={languageLabels[locale]}>
                          {languageIcons[locale]}
                        </span>{' '}
                        {languageLabels[locale]}
                    </Menu.Item>
                ))}
            </Menu>
        );
        return (
            <HeaderDropdown
                placement={"bottomLeft"}
                overlay={langMenu}
                onVisibleChange={this.handleVisibleChange}
            >
                <span className={cx("dropDown", {opened: visible})}>
                  <Icon type="global"/>
                </span>
            </HeaderDropdown>
        );
    }
}
