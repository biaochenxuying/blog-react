import React, { Component } from 'react';
import { Modal, Input, Icon, message, Button } from 'antd';
import { connect } from 'react-redux';
import { registerSuccess, registerFailue } from '../../store/actions/user';
import https from '../../utils/https';
import urls from '../../utils/urls';
import config from '../../utils/config';

@connect(
  state => state.user,
  { registerSuccess, registerFailue },
)
class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      name: '',
      password: '',
      phone: '',
      introduce: '',
      type: 1,
    };
    this.register = this.register.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  register({ email, name, password, phone, introduce, type }) {
    https
      .post(urls.register, {
        email,
        name,
        password,
        phone,
        introduce,
        type,
      })
      .then(res => {
        if (res.status === 200 && res.data.code === 0) {
          this.props.registerSuccess(res.data.data);
          this.props.handleCancel();
          message.success('注册成功, 请登录~', 1);
          this.setState({
            email: '',
            name: '',
            password: '',
            phone: '',
            introduce: '',
          });
        } else {
          this.props.registerFailue(res.data.message);
          message.error(res.data.message, 1);
        }
      })
      .catch(err => {
        console.log(err);
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
    } else if (!this.state.name) {
      message.warn('用户名不能为空！');
    } else if (!this.state.password) {
      message.warn('密码不能为空！');
    } else {
      this.register(this.state);
    }
    const re = /^(((13[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
    if (this.state.phone && !re.test(this.state.phone)) {
      message.warn('请输入正确的手机号!');
    }
  }
  handleOAuth() {
    // 保存授权前的页面链接
    let preventHistory = {
      pathname: window.location.pathname,
      search: window.location.search,
    };
    window.sessionStorage.preventHistory = JSON.stringify(preventHistory);
    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=6de90ab270aea2bdb01c&redirect_uri=http://biaochenxuying.cn/login'
    window.location.href = `${config.oauth_uri}?client_id=${
      config.client_id
    }&redirect_uri=${config.redirect_uri}`;
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }
  render() {
    return (
      <Modal
        title="注册"
        style={{ top: '18%' }}
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        width={500}
        footer={null}
      >
        <div className="register-input">
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="email"
            placeholder="请输入邮箱"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="name"
            placeholder="请输入用户名"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            name="password"
            placeholder="请输入密码"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 20 }}
            prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="phone"
            placeholder="请输入手机（可为空）"
            value={this.state.phone}
            onChange={this.handleChange}
          />
          <Input
            style={{ marginBottom: 40 }}
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            name="introduce"
            placeholder="请输入个人介绍（可为空）"
            value={this.state.introduce}
            onChange={this.handleChange}
          />
        </div>
        <div className="register-submit">
          <Button
            style={{ width: '100%', marginBottom: '20px' }}
            type="primary"
            onClick={this.handleOk}
          >
            注册
          </Button>
          <Button style={{ width: '100%' }} onClick={this.handleOAuth}>
            github 授权登录
          </Button>
        </div>
      </Modal>
    );
  }
}

export default Register;
