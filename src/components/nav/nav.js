import './index.less';
import logo from '../../assets/all.png';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Layout, Icon, Menu, Row, Col, Button } from 'antd';
import Register from '../register/register';
import Login from '../login/login';

const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

// @connect(state => state.getIn(['user']), dispatch => bindActionCreators({ }, dispatch))
class Nav extends Component {
	constructor(props) {
		super(props);
		this.state = {
			current: null,
			menuCurrent: '',
			login: false,
			register: false,
			nav: '首页',
		};
		this.menuClick = this.menuClick.bind(this);
		this.showLoginModal = this.showLoginModal.bind(this);
		this.showRegisterModal = this.showRegisterModal.bind(this);
		this.handleLoginCancel = this.handleLoginCancel.bind(this);
		this.handleRegisterCancel = this.handleRegisterCancel.bind(this);
		this.initMenu = this.initMenu.bind(this);
		this.handleMenu = this.handleMenu.bind(this);
		this.handleLogout = this.handleLogout.bind(this);
	}
	componentDidMount() {
		this.initMenu();
	}

	initMenu() {
		// console.log('this.props pathname', this.props.pathname);
		let name = this.props.pathname;
		let key = '1';
		if (name === '/home') {
			key = '1';
		} else if (name === '/hot') {
			key = '2';
		} else if (name === '/timeLine') {
			key = '3';
		} else if (name === '/message') {
			key = '4';
		} else if (name === '/about') {
			key = '5';
		}
		this.setState({
			menuCurrent: key,
		});
	}

	handleMenu = e => {
		// console.log('click ', e);
		this.setState({
			menuCurrent: e.key,
		});
	};

	handleLogout = e => {
		// console.log('click ', e);
		this.setState({
			current: e.key,
		});
		window.sessionStorage.userInfo = '';
	};

	showLoginModal() {
		// [event.target.name]: event.target.value
		this.setState({
			login: true,
		});
	}
	showRegisterModal() {
		this.setState({
			register: true,
		});
	}
	handleLoginCancel() {
		this.setState({
			login: false,
		});
	}
	handleRegisterCancel() {
		this.setState({
			register: false,
		});
	}
	menuClick({ key }) {
		this.setState({
			nav: key,
		});
	}
	render() {
		let userInfo = '';
		if (window.sessionStorage.userInfo) {
			userInfo = JSON.parse(window.sessionStorage.userInfo);
		}
		return (
			<div className="left">
				<Header
					className="header "
					style={{
						position: 'fixed',
						zIndex: 1,
						top: 0,
						width: '100%',
						height: '66px',
						float: 'left',
						backgroundColor: 'white',
						borderBottom: '1px solid #eee',
					}}
				>
					<Row className="container">
						<Col style={{ width: '120px', float: 'left' }}>
							<a href="http://biaochenxuying.cn/main.html">
								<div className="logo ">
									<img src={logo} alt="" />
								</div>
							</a>
						</Col>
						<Col style={{ width: '780px', float: 'left' }}>
							<Menu
								theme="light"
								mode="horizontal"
								defaultSelectedKeys={['1']}
								onClick={this.handleMenu}
								selectedKeys={[this.state.menuCurrent]}
								style={{ lineHeight: '64px', borderBottom: 'none' }}
							>
								<Menu.Item key="1">
									<Link to="/home">
										<Icon type="home" theme="outlined" />首页
									</Link>
								</Menu.Item>
								<Menu.Item key="2">
									<Link to="/hot">
										<Icon type="fire" theme="outlined" />热门
									</Link>
								</Menu.Item>
								<Menu.Item key="3">
									<Link to="/timeLine">
										<Icon type="hourglass" theme="outlined" />时间轴
									</Link>
								</Menu.Item>
								<Menu.Item key="4">
									<Link to="/message">
										<Icon type="message" theme="outlined" />留言
									</Link>
								</Menu.Item>
								<Menu.Item key="5">
									<Link to="/about">
										<Icon type="user" theme="outlined" />关于
									</Link>
								</Menu.Item>
							</Menu>
						</Col>
						<Col style={{ textAlign: 'right', width: '300px', float: 'left' }}>
							{userInfo ? (
								<Menu
									onClick={this.handleLogout}
									style={{ width: 220, lineHeight: '64px', display: 'inline-block' }}
									selectedKeys={[this.state.current]}
									mode="horizontal"
								>
									<SubMenu
										title={
											<span className="submenu-title-wrapper">
												<Icon type="user" /> {userInfo.name}
											</span>
										}
									>
										<MenuItemGroup>
											<Menu.Item key="logout">退出</Menu.Item>
										</MenuItemGroup>
									</SubMenu>
								</Menu>
							) : (
								<div>
									<Button
										type="primary"
										icon="login"
										style={{ marginRight: '15px' }}
										onClick={this.showLoginModal}
									>
										登 录
									</Button>
									<Button
										type="danger"
										icon="logout"
										style={{ marginRight: '15px' }}
										onClick={this.showRegisterModal}
									>
										注 册
									</Button>
								</div>
							)}
						</Col>
					</Row>
				</Header>
				<Login visible={this.state.login} handleCancel={this.handleLoginCancel} />
				<Register visible={this.state.register} handleCancel={this.handleRegisterCancel} />
			</div>
		);
	}
}

export default Nav;
