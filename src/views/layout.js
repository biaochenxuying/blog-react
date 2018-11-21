import './index.less';
import React, { Component } from 'react';
import SliderRight from '../components/slider/index';
import Nav from '../components/nav/nav';
import { Layout, BackTop } from 'antd';
const { Content, Footer, Sider } = Layout;

class Layouts extends Component {
	constructor(props) {
		super(props);
		this.state = {
			// value: null,
		};
		// console.log(this.props);
		// console.log(this.props.location.pathname);
	}
	componentDidMount() { }
	render() {
		return (
			<div className="Layouts">
				<Nav pathname={this.props.location.pathname} />
				<Layout className="layout">
					<Content>
						<Layout style={{ padding: '24px 0', background: '#fff' }}>
							<Content style={{ padding: '0 24px 0 0', minHeight: 280 }}>{this.props.children}</Content>
							{this.props.location.pathname === '/articleDetail' ||  this.props.location.pathname === '/about' ? (
								''
							) : (
								<Sider width={350} style={{ background: '#fff' }}>
									<SliderRight />
								</Sider>
							)}
						</Layout>
					</Content>
					<Footer style={{ textAlign: 'center', background: '#fff' }}>
						全栈修炼 ©2018 Created by BiaoChenXuYing
					</Footer>
				</Layout>
				<BackTop />
			</div>
		);
	}
}

export default Layouts;
