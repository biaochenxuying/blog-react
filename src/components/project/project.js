import './index.less';
import React, { Component } from 'react';
import { message, Card } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import https from '../../utils/https';
import urls from '../../utils/urls';
import LoadingCom from '../loading/loading';
import LoadEndCom from '../loadEnd/loadEnd';
import {
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  timestampToTime,
} from '../../utils/utils';
const { Meta } = Card;

class Project extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isLoadEnd: false,
      keyword: '',
      pageNum: 1,
      pageSize: 10,
      total: 0,
      list: [],
    };
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.handleSearch();
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        // 如果还有数据，都可以继续滚动加载
        if (this.state.isLoadEnd === false && this.state.isLoading === false) {
          this.handleSearch();
        }
      }
    };
  }

  handleSearch = () => {
    this.setState({
      isLoading: true,
    });
    https
      .get(urls.getProjectList, {
        params: {
          keyword: this.state.keyword,
          pageNum: this.state.pageNum,
          pageSize: this.state.pageSize,
        },
      })
      .then(res => {
        let num = this.state.pageNum;
        if (res.status === 200 && res.data.code === 0) {
          this.setState({
            list: this.state.list.concat(res.data.data.list),
            total: res.data.data.count,
            pageNum: ++num,
            isLoading: false,
          });
          if (this.state.total === this.state.list.length) {
            this.setState({
              isLoadEnd: true,
            });
          }
        } else {
          message.error(res.data.message);
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    // state 状态 1 是已经完成 ，2 是正在进行，3 是没完成
    const list = this.state.list.map((item, i) => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <a href={item.url} target="_blank" rel="noopener noreferrer">
          <Card
            hoverable
            style={{ width: '100%' }}
            cover={<img alt={item.title} src={item.img} />}
          >
            <Meta title={item.title} description={item.content} />
            <span>
              {item.start_time ? timestampToTime(item.start_time, false) : ''}{' '}
              --
              {item.end_time ? timestampToTime(item.end_time, false) : ''}
            </span>
          </Card>
        </a>
      </ReactCSSTransitionGroup>
    ));

    return (
      <div className="left">
        <ul className="project">{list}</ul>
        {this.state.isLoading ? <LoadingCom /> : ''}
        {this.state.isLoadEnd ? <LoadEndCom /> : ''}
      </div>
    );
  }
}

export default Project;
