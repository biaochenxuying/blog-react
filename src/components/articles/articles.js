import './index.less';
import React, { Component } from 'react';
import { Icon } from 'antd';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import https from '../../utils/https';
import urls from '../../utils/urls';
import LoadingCom from '../loading/loading';
import LoadEndCom from '../loadEnd/loadEnd';
import {
	getScrollTop,
	getDocumentHeight,
	getWindowHeight,
	getQueryStringByName,
	timestampToTime,
} from '../../utils/utils';
/*actions*/
import { saveArticlesList } from '../../store/actions/articles';

@connect(state => state.getIn(['articles']), { saveArticlesList })
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
		// console.log('nextProps.location :', nextProps.location)
		// console.log('nextProps.location.pathname :', nextProps.location.search)
		// console.log('props.location.pathname :', this.props.location.search)
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
		// console.log('location.pathname', this.props.location.pathname);
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
				// console.log(res);
				let num = this.state.pageNum;
				if (res.status === 200 && res.data.code === 0) {
					// this.props.saveArticlesList(res.data.data);
					this.setState({
						articlesList: this.state.articlesList.concat(res.data.data.list),
						total: res.data.data.count,
						pageNum: ++num,
						isLoading: false,
					});
					if (this.state.total === this.state.articlesList.length) {
						this.setState({
							isLoadEnd: true,
						});
					}
				} else {
				}
			})
			.catch(err => {
				console.error(err);
			});
	}

	render() {
		// console.log('blog articlesList:', this.props.articlesList);
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
						<img className="img-blur-done" data-src={item.img_url} src={item.img_url} alt="120" />
					</a>
					<div className="content">
						<Link className="title" target="_blank" to={`/articleDetail?article_id=${item._id}`}>
							{item.title}
						</Link>
						<p className="abstract">{item.desc}</p>
						<div className="meta">
							<Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
								<Icon type="eye" theme="outlined" /> {item.meta.views}
							</Link>{' '}
							<Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
								<Icon type="message" theme="outlined" /> {item.meta.comments}
							</Link>{' '}
							<Link target="_blank" to={`/articleDetail?article_id=${item._id}`}>
								<Icon type="heart" theme="outlined" /> {item.meta.likes}
							</Link>
							<span className="time">{item.create_time ? timestampToTime(item.create_time) : ''}</span>
						</div>
					</div>
				</li>
			</ReactCSSTransitionGroup>
		));

		return (
			<div className="left">
				{this.state.tag_id ? <h3 className="left-title">{this.state.tag_name} 相关的文章：</h3> : ''}
				<ul className="note-list">{list}</ul>
				{this.state.isLoading ? <LoadingCom /> : ''}
				{this.state.isLoadEnd ? <LoadEndCom /> : ''}
			</div>
		);
	}
}

export default Articles;
