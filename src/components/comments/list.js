import './index.less';
import React, { Component } from 'react';
import { message, Avatar, Spin } from 'antd';
import https from '../../utils/https';
import urls from '../../utils/urls';
import { timestampToTime } from '../../utils/utils';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import ChildrenComment from './childrenComment.js';

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      visible: false,
      content: '',
      comment_id: '',
      to_user: {},
      articleDetail: {
        _id: '',
        content: '',
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
      cacheTime: 0, // 缓存时间
      times: 0, // 评论次数
    };
    this.handleAddOtherComment = this.handleAddOtherComment.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.showCommentModal = this.showCommentModal.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  handleCancel() {
    this.setState({
      visible: false,
    });
  }

  // 添加评论
  showCommentModal(item, secondItem) {
    if (!window.sessionStorage.userInfo) {
      message.error('登录才能评论，请先登录！');
      return false;
    }
    // 添加三级评论
    if (secondItem) {
      this.setState({
        visible: true,
        comment_id: item._id,
        to_user: secondItem.user,
      });
    } else {
      // 添加二级评论
      this.setState({
        visible: true,
        comment_id: item._id,
        to_user: item.user,
      });
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  componentWillMount() {}

  handleAddOtherComment() {
    if (!this.state.comment_id) {
      message.warning('该父评论不存在！');
      return;
    }

    if (this.state.times > 10) {
      message.warning('您今天评论的次数已经用完，明天再来评论吧！', 1);
      return;
    }

    let now = new Date();
    let nowTime = now.getTime();
    if (nowTime - this.state.cacheTime < 60000) {
      message.warning('您评论太过频繁，1 分钟后再来评论吧！', 1);
      return;
    }

    if (!this.state.content) {
      message.warning('评论内容不能为空!');
      return;
    }
    let user_id = '';
    if (window.sessionStorage.userInfo) {
      let userInfo = JSON.parse(window.sessionStorage.userInfo);
      user_id = userInfo._id;
    } else {
      message.warning('登录才能评论，请先登录！');
      return;
    }
    this.setState({
      isLoading: true,
    });
    https
      .post(
        urls.addThirdComment,
        {
          article_id: this.props.article_id,
          user_id,
          comment_id: this.state.comment_id,
          content: this.state.content,
          to_user: JSON.stringify(this.state.to_user),
        },
        { withCredentials: true },
      )
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          const times = this.state.times + 1
          this.setState({
            cacheTime: nowTime,
            times: times,
            content: '',
            visible: false,
            isLoading: false,
          });
          this.props.refreshArticle();
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        this.setState({
          visible: false,
          isLoading: false,
        });
        console.error(err);
      });
  }

  render() {
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
              <div className="avator">
                <Avatar size="large" icon="user" src={item.user.avatar} />
              </div>
            </div>
            <div className="info">
              <div className="name">
                {item.user.name}
                {item.user.type === 0 ? '(作者)' : ''}
              </div>
              <div className="time">
                {item.create_time
                  ? timestampToTime(item.create_time, true)
                  : ''}
              </div>
            </div>
          </div>
          <div className="comment-detail">{item.content}</div>
          <div className="item-comment">
            {/* <div className="like" >
							<Avatar size="small" icon="like" /> 赞
						</div> */}
            <div
              onClick={() => this.showCommentModal(item)}
              className="message"
            >
              <Avatar size="small" icon="message" /> 回复
            </div>
          </div>
          {item.other_comments.map((e, index) => {
            return (
              <div key={e._id} className="item-other">
                <div className="item-header">
                  <div className="author">
                    <div className="avator">
                      <Avatar size="large" icon="user" src={e.user.avatar} />
                    </div>
                  </div>
                  <div className="info">
                    <div className="name">
                      {e.user.name}
                      {e.user.type === 0 ? '(作者)' : ''}
                    </div>
                    <div className="time">
                      {e.create_time
                        ? timestampToTime(e.create_time, true)
                        : ''}
                    </div>
                  </div>
                </div>
                <div className="comment-detail">
                  {'@' + e.to_user.name}
                  {e.to_user.type === 0 ? '(作者)' : ''}：{e.content}
                </div>
                <div className="item-comment">
                  {/* <a className="like">
										<Avatar size="small" icon="like" /> 赞
									</a> */}
                  <div
                    onClick={() => this.showCommentModal(item, e)}
                    className="message"
                  >
                    <Avatar size="small" icon="message" /> 回复
                  </div>
                </div>
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
        <Spin spinning={this.state.isLoading}>{list}</Spin>
        <ChildrenComment
          visible={this.state.visible}
          content={this.state.content}
          handleChange={this.handleChange}
          handleOk={this.handleAddOtherComment}
          handleCancel={this.handleCancel}
        />
      </div>
    );
  }
}

export default CommentList;
