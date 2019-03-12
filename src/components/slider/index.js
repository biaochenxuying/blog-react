import './index.less';
import logo from '../../assets/userLogo.jpeg';
import React, { Component } from 'react';
import { Icon, Avatar, message } from 'antd';
import { Link } from 'react-router-dom';
import https from '../../utils/https';
import urls from '../../utils/urls';

class SliderRight extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false,
			keyword: '',
			type: 2, //1 :其他友情链接 2: 是管理员的个人链接 ,‘’ 代表所有链接
			pageNum: 1,
			pageSize: 50,
			list: [],
			linkList: [],
			filingList: [
				{
					id: 1,
					name: '2018-12-12',
					urlId: '/home',
				},
				{
					id: 2,
					name: '2018-12-12',
					urlId: '/home',
				},
				{
					id: 3,
					name: '2018-12-12',
					urlId: '/home',
				},
			],
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSearch = this.handleSearch.bind(this);
		this.loadLink = this.loadLink.bind(this);
	}

	componentDidMount() {
		this.handleSearch();
		this.loadLink();
	}
	loadLink = () => {
		https
			.get(urls.getLinkList, {
				params: {
					type: this.state.type,
					keyword: this.state.keyword,
					pageNum: this.state.pageNum,
					pageSize: this.state.pageSize,
				},
			})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					this.setState({
						linkList: res.data.data.list,
					});
				} else {
					message.error(res.data.message);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	handleSearch = () => {
		https
			.get(urls.getTagList, {
				params: {
					keyword: this.state.keyword,
					pageNum: this.state.pageNum,
					pageSize: this.state.pageSize,
				},
			})
			.then(res => {
				if (res.status === 200 && res.data.code === 0) {
					this.setState({
						list: res.data.data.list,
					});
				} else {
					message.error(res.data.message);
				}
			})
			.catch(err => {
				console.log(err);
			});
	};

	handleClick(event) {
		this.setState({
			//   [event.target.name]: event.target.value
		});
	}
	render() {
		// const list = this.state.list.map((item, i) => (
		// 	<span key={item._id} className="item">
		// 		{item.name}
		// 	</span>
		// ));
		const list = this.state.list.map((item, i) => (
			<Link className="item" key={item._id} to={`/home?tag_id=${item._id}&tag_name=${item.name}&category_id=`}>
				<span key={item._id}>{item.name}</span>
			</Link>
		));
		// const filingList = this.state.filingList.map((item, i) => (
		// 	<Link to={item.urlId} key={item.id}>
		// 		<div className="item">{item.name}</div>
		// 	</Link>
		// ));
		const linkChildren = this.state.linkList.map(item => (
			<a key={item._id} target="_blank" rel="noopener noreferrer" href={item.url}>
				<Icon
					key={item._id}
					type={item.icon}
					theme="outlined"
					style={{ fontSize: '20px', marginRight: '10px' }}
				/>
			</a>
		));

		return (
			<div className="right">
				<Avatar className="right-logo" src={logo} size={130} icon="user" />
				<div className="title">BiaoChenXuYing</div>
				<div className="right-content">
					{/* <div className="item">
						<div className="num">123</div>粉丝<Icon type="right" theme="outlined" />
					</div>
					<div className="item">
						<div className="num">123</div>文章<Icon type="right" theme="outlined" />
					</div>
					<div className="item">
						<div className="num">123</div>字数<Icon type="right" theme="outlined" />
					</div>
					<div className="item">
						<div className="num">123</div>收获喜欢<Icon type="right" theme="outlined" />
					</div> */}
				</div>
				<div className="introduce">
					<div className="title">个人介绍</div>
					<div className="content">
						加班到天明，学习到昏厥 ！！！ <br /> 微信公众号：【 BiaoChenXuYing 】 <br /> 分享 WEB 全栈开发等相关的技术文章，热点资源，全栈程序员的成长之路。
					</div>
					<div className="footer">{linkChildren}</div>
				</div>
				<div className="tags">
					<div className="title">标签云</div>
					{list}
				</div>
				{/* <div className="classification">
					<div className="title">文章归档</div>
					{filingList}
				</div> */}
			</div>
		);
	}
}

export default SliderRight;
