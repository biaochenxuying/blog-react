import './index.less';
import React, { Component } from 'react';
import { Icon } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import https from '../../utils/https';
import urls from '../../utils/urls';
import LoadingCom from '../loading/loading';
import LoadEndCom from '../loadEnd/loadEnd';
import bg from '../../assets/bg.jpg';
import {
  throttle,
  getScrollTop,
  getDocumentHeight,
  getWindowHeight,
  getQueryStringByName,
  timestampToTime,
} from '../../utils/utils';
/*actions*/
import { saveArticlesList } from '../../store/actions/articles';

// 获取可视区域的高度
const viewHeight = window.innerHeight || document.documentElement.clientHeight;
// 用新的 throttle 包装 scroll 的回调
const lazyload = throttle(() => {
  // 获取所有的图片标签
  const imgs = document.querySelectorAll('#list .wrap-img img');
  // num 用于统计当前显示到了哪一张图片，避免每次都从第一张图片开始检查是否露出
  let num = 0;
  for (let i = num; i < imgs.length; i++) {
    // 用可视区域高度减去元素顶部距离可视区域顶部的高度
    let distance = viewHeight - imgs[i].getBoundingClientRect().top;
    // 如果可视区域高度大于等于元素顶部距离可视区域顶部的高度，说明元素露出
    if (distance >= 100) {
      // 给元素写入真实的 src，展示图片
      let hasLaySrc = imgs[i].getAttribute('data-has-lazy-src');
      if (hasLaySrc === 'false') {
        imgs[i].src = imgs[i].getAttribute('data-src');
        imgs[i].setAttribute('data-has-lazy-src', true);
      }
      // 前 i 张图片已经加载完毕，下次从第 i+1 张开始检查是否露出
      num = i + 1;
    }
  }
}, 1000);

@connect(
  state => state.articles,
  { saveArticlesList },
)
class Articles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadEnd: false,
      isLoading: false,
      keyword: '',
      likes: '', // 是否是热门文章
      state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
      tag_id: getQueryStringByName('tag_id'),
      tag_name: decodeURI(getQueryStringByName('tag_name')),
      category_id: getQueryStringByName('category_id'),
      pageNum: 1,
      pageSize: 10,
      articlesList: [],
      total: 0,
    };
    this.handleSearch = this.handleSearch.bind(this);
    this.getBlog = this.getBlog.bind(this);
  }

  getBlog() {
    let params = {
      keyword: this.state.keyword,
      likes: this.state.likes,
      state: this.state.state,
      pageNum: this.state.pageNum,
      pageSize: this.state.pageSize,
    };
    this.props.getBlogList(params);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location.search !== this.props.location.search) {
      this.setState(
        {
          pageNum: 1,
          articlesList: [],
          tag_id: getQueryStringByName('tag_id'),
          tag_name: decodeURI(getQueryStringByName('tag_name')),
          category_id: getQueryStringByName('category_id'),
        },
        () => {
          this.handleSearch();
        },
      );
    }
  }

  componentDidMount() {
    if (this.props.location.pathname === '/hot') {
      this.setState(
        {
          likes: true,
        },
        () => {
          this.handleSearch();
        },
      );
    } else {
      this.handleSearch();
    }
    window.onscroll = () => {
      if (getScrollTop() + getWindowHeight() > getDocumentHeight() - 100) {
        // 如果不是已经没有数据了，都可以继续滚动加载
        if (this.state.isLoadEnd === false && this.state.isLoading === false) {
          this.handleSearch();
        }
      }
    };

    document.addEventListener('scroll', lazyload);
  }

  handleSearch() {
    this.setState({
      isLoading: true,
    });
    https
      .get(
        urls.getArticleList,
        {
          params: {
            keyword: this.state.keyword,
            likes: this.state.likes,
            state: this.state.state,
            tag_id: this.state.tag_id,
            category_id: this.state.category_id,
            pageNum: this.state.pageNum,
            pageSize: this.state.pageSize,
          },
        },
        { withCredentials: true },
      )
      .then(res => {
        let num = this.state.pageNum;
        if (res.status === 200 && res.data.code === 0) {
          this.setState(preState => ({
            articlesList: [...preState.articlesList, ...res.data.data.list],
            total: res.data.data.count,
            pageNum: ++num,
            isLoading: false,
          }));
          if (this.state.total === this.state.articlesList.length) {
            this.setState({
              isLoadEnd: true,
            });
          }
          lazyload();
        } else {
        }
      })
      .catch(err => {
        console.error(err);
      });
  }

  render() {
    const list = this.state.articlesList.map((item, i) => (
      <ReactCSSTransitionGroup
        key={item._id}
        transitionName="example"
        transitionAppear={true}
        transitionAppearTimeout={1000}
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
      >
        <li key={item._id} className="have-img">
          <a className="wrap-img" href="/" target="_blank">
            <img
              className="img-blur-done"
              data-src={item.img_url}
              data-has-lazy-src="false"
              src={bg}
              alt="文章封面"
            />
          </a>
          <div className="content">
            <Link
              className="title"
              target="_blank"
              to={`/articleDetail?article_id=${item._id}`}
            >
              {item.title}
            </Link>
            <p className="abstract">{item.desc}</p>
            <div className="meta">
              <Link
                rel="noopener noreferrer"
                to={`/articleDetail?article_id=${item._id}`}
              >
                <Icon type="eye" theme="outlined" /> {item.meta.views}
              </Link>{' '}
              <Link
                target="_blank"
                to={`/articleDetail?article_id=${item._id}`}
              >
                <Icon type="message" theme="outlined" /> {item.meta.comments}
              </Link>{' '}
              <Link
                target="_blank"
                to={`/articleDetail?article_id=${item._id}`}
              >
                <Icon type="heart" theme="outlined" /> {item.meta.likes}
              </Link>
              <span className="time">
                {item.create_time
                  ? timestampToTime(item.create_time, true)
                  : ''}
              </span>
            </div>
          </div>
        </li>
      </ReactCSSTransitionGroup>
    ));

    return (
      <div className="left">
        {this.state.tag_id ? (
          <h3 className="left-title">{this.state.tag_name} 相关的文章：</h3>
        ) : (
          ''
        )}
        <ul className="note-list" id="list">
          {list}
        </ul>
        {this.state.isLoading ? <LoadingCom /> : ''}
        {this.state.isLoadEnd ? <LoadEndCom /> : ''}
      </div>
    );
  }
}

export default Articles;
