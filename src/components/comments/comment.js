import './index.less';
import React, { Component } from 'react';
import { Avatar, Input } from 'antd';

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
      id: '',
      name: '',
      avatar: '',
    };
    if (window.sessionStorage.userInfo) {
      userInfo = JSON.parse(window.sessionStorage.userInfo);
    }
    return (
      <div className="comment">
        <div className="avatar">
          <Avatar
            className="auth-logo"
            size={50}
            icon="user"
            src={userInfo.avatar}
          />
        </div>
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
            <div href="/" className="btn btn-send">
              发送中...
            </div>
          ) : (
            <div
              href="/"
              onClick={this.props.handleAddComment}
              className="btn btn-send"
            >
              发送
            </div>
          )}
          <div className="cancel">取消</div>
        </div>
      </div>
    );
  }
}

export default Comment;
