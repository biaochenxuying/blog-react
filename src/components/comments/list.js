import './index.less';
// import logo from '../../assets/userLogo.jpeg';
import React, { Component } from 'react';
import { notification, Avatar } from 'antd';
import https from '../../utils/https';
import urls from '../../utils/urls';
import { timestampToTime } from '../../utils/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class CommentList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			// list: [],
			articleDetail: {
				_id: '',
				content: 'biaochenxuying biaochenxuying biaochenxuying',
				author: 'biaochenxuying',
				category: [],
				comments: [],
				create_time: '',
				desc: '',
				id: '',
				img_url: '',
				numbers: 0,
				keyword: [],
				like_users: [],
				meta: { views: 0, likes: 0, comments: 0 },
				origin: 0,
				state: 1,
				tags: [],
				title: '',
				update_time: '',
			},
		};
		this.handleAddThirdComment = this.handleAddThirdComment.bind(this);
	}

	componentWillMount() {}

	handleAddThirdComment(article_id) {
		if (!article_id) {
			notification.error({
				message: '文章不存在！',
			});
			return;
		}
		let user_id = '';
		if (window.sessionStorage.userInfo) {
			user_id = window.sessionStorage.userInfo.id;
		} else {
			notification.error({
				message: '登录才能评论，请先登录！',
			});
			return;
		}
		this.setState({
			isLoading: true,
		});
		https
			.post(
				urls.addComment,
				{
					id: this.props.article_id,
					user_id,
					content: this.state.content,
				},
				{ withCredentials: true },
			)
			.then(res => {
				// console.log('res:', res);
				if (res.status === 200 && res.data.code === 0) {
					this.setState({
						content: '',
						isLoading: false,
					});
				} else {
					notification.error({
						message: res.data.message,
					});
				}
			})
			.catch(err => {
				console.log(err);
			});
	}

	render() {
		// console.log('list', this.props);
		const list = this.props.list.map(item => (
			<ReactCSSTransitionGroup
				key={item.id}
				transitionName="example"
				transitionAppear={true}
				transitionAppearTimeout={1000}
				transitionEnterTimeout={1000}
				transitionLeaveTimeout={1000}
			>
				<div className="item">
					<div className="item-header">
						<div className="author">
							<a href="" className="avator">
								<Avatar size="large" icon={item.user.avatar} />
							</a>
						</div>
						<div className="info">
							<a href="" className="name">
								{item.user.name}
							</a>
							<div className="time">{item.create_time ? timestampToTime(item.create_time) : ''}</div>
						</div>
					</div>
					<div className="comment-detail">{item.content}</div>
					{item.other_comments.map(function(e, index) {
						return (
							<div key={e._id} className="item-other">
								<div className="item-header">
									<div className="author">
										<a href="" className="avator">
											<Avatar size="large" icon={e.user.avatar} />
										</a>
									</div>
									<div className="info">
										<a href="" className="name">
											{e.user.name}
										</a>
										<div className="time">
											{e.create_time ? timestampToTime(e.create_time) : ''}
										</div>
									</div>
								</div>
								<div className="comment-detail">{e.content}</div>
							</div>
						);
					})}
				</div>
			</ReactCSSTransitionGroup>
		));

		return (
			<div className="comment-list">
				<div className="top-title">
					<span>{this.props.numbers} 条评论</span>
				</div>
				{list}
			</div>
		);
	}
}

export default CommentList;
