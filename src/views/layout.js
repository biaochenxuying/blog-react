import './index.less';
import './mobile.less';
import React, { Component } from 'react';
import { Layout, BackTop } from 'antd';
import SliderRight from '../components/slider/index';
import Nav from '../components/nav/nav';
import { isMobileOrPc } from '../utils/utils';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // isShowSlider: false,
      // isIndexPage: false,
    };
  }

  render() {
    let isShowSlider = false;
    let pathName = this.props.location.pathname;
    if (
      pathName !== '/articleDetail' &&
      pathName !== '/about' &&
      !isMobileOrPc()
    ) {
      isShowSlider = true;
    }

    return (
      <div className="Layouts">
        <div>
          <Nav pathname={this.props.location.pathname} />
          <Layout className="layout">
            <Content>
              <Layout style={{ padding: '24px 0', background: '#fff' }}>
                <Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>
                  {this.props.children}
                </Content>
                {!isShowSlider ? (
                  ''
                ) : (
                  <Sider width={350} style={{ background: '#fff' }}>
                    <SliderRight />
                  </Sider>
                )}
              </Layout>
            </Content>
          </Layout>
          <Footer style={{ textAlign: 'center', background: '#fff' }}>
            Jessie's Blog ©2022 Created by Shuangjie You
          </Footer>
          <BackTop />
        </div>
      </div>
    );
  }
}

export default Layouts;
