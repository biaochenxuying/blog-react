import './index.less';
import React, { Component } from 'react';
import { Input, Button, Icon, message } from 'antd';
import https from '../../utils/https';
import urls from '../../utils/urls';

class TimeLineCustom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: '',
      phone: '',
      name: '',
      content: '',
      cacheTime: 0, // 缓存时间
      times: 0, // 评论次数
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
  }

  addMessage({ email, name, phone, content }) {
    if (this.state.times > 3) {
      message.warning('您今天留言的次数已经用完，明天再来留言吧！', 1);
      return;
    }

    let now = new Date();
    let nowTime = now.getTime();
    if (nowTime - this.state.cacheTime < 60000) {
      message.warning('您留言太过频繁，1 分钟后再来留言吧！', 1);
      return;
    }
    this.setState({
      isLoading: true,
    });
    https
      .post(
        urls.addMessage,
        {
          email,
          name,
          phone,
          content,
        },
        { withCredentials: true },
      )
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            isLoading: false,
          });
          message.success('您的留言，已保存到后台，管理员会尽快回复您的！', 1);
          const times = this.state.times + 1
          this.setState({
            cacheTime: nowTime,
            times: times,
            email: '',
            name: '',
            phone: '',
            content: '',
          });
        } else {
          this.setState({
            isLoading: false,
          });
          message.error(res.data.message, 1);
        }
      })
      .catch(err => {
        this.setState({
          isLoading: false,
        });
        console.error(err);
      });
  }

  handleOk() {

    const reg = new RegExp(
      '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$',
    ); //正则表达式
    if (!this.state.email) {
      message.warn('邮箱不能为空！');
    } else if (!reg.test(this.state.email)) {
      message.warn('请输入格式正确的邮箱！');
    } else if (!this.state.content) {
      message.warn('内容不能为空');
    } else {
      this.addMessage(this.state);
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div className="message">
        <div className="">
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="safety" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            placeholder="邮箱（不能为空）"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="name"
            placeholder="名字（可为空）"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="phone"
            placeholder="手机（可为空）"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={
              <Icon type="message" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            name="content"
            placeholder="留言内容（不能为空）"
            value={this.state.content}
            onChange={this.handleChange}
          />
        </div>
        <div className="submit">
          <Button
            loading={this.state.isLoading}
            style={{ width: '100%' }}
            type="primary"
            onClick={this.handleOk}
          >
            提交
          </Button>
        </div>
      </div>
    );
  }
}

export default TimeLineCustom;
