import './index.less';
// import logo from '../../assets/userLogo.jpeg';
import React, { Component } from 'react';
import { Avatar, Input } from 'antd';
// import https from '../../utils/https';

const { TextArea } = Input;

class Comment extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLoading: false,
			content: '',
		};
	}

	componentWillMount() {}

	render() {
		let userInfo = {
			name: '',
		};
		if (window.sessionStorage.userInfo) {
			userInfo = JSON.parse(window.sessionStorage.userInfo);
		}
		return (
			<div className="comment">
				<a className="avatar" href="">
					<Avatar className="auth-logo" size={50} icon="user" />
				</a>
				<h3>{userInfo.name}</h3>
				<TextArea
					className="textarea"
					name="content"
					value={this.props.content}
					onChange={this.props.handleChange}
					placeholder="文明社会，理性评论..."
					rows={4}
				/>
				<div className="new-comment write-function-block">
					{this.props.isSubmitLoading ? (
						<a className="btn btn-send">发送中...</a>
					) : (
						<a onClick={this.props.handleAddComment} className="btn btn-send">发送</a>
					)}
					<a  className="cancel">
							取消
						</a>
				</div>
			</div>
		);
	}
}

export default Comment;
