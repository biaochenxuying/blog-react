import './index.less';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Timeline, Icon, message } from 'antd';
import https from '../../utils/https';
import urls from '../../utils/urls';
import { timestampToTime } from '../../utils/utils';
import LoadingCom from '../loading/loading';

class Archive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            isLoadEnd: false,
            likes: "", // 是否是热门文章
            state: 1, // 文章发布状态 => 0 草稿，1 已发布,'' 代表所有文章
            article: 1,
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
    }

    handleSearch = () => {
        this.setState({
            isLoading: true,
        });
        https
            .get(urls.getArticleList, {
                params: {
                    state: this.state.state,
                    keyword: this.state.keyword,
                    pageNum: this.state.pageNum,
                    pageSize: this.state.pageSize,
                    article: this.state.article,
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
        const list = this.state.list.map((item, i) => ( <
                Timeline.Item key = { i }
                color = { 'red' }
                dot = { < Icon type = "clock-circle-o"
                    style = {
                        { fontSize: '16px' } }
                    />} >
                    <
                    h1 > { item.year } < /h1> {
                        item.list.map(ele => {
                            return ( <
                                Timeline key = { ele._id } >
                                <
                                Timeline.Item >
                                <
                                Link className = "title"
                                target = "_blank"
                                to = { `/articleDetail?article_id=${ele._id}` } >
                                <
                                h3 > { ele.title } < /h3> <
                                /Link> <
                                p >
                                <
                                span > {
                                    ele.create_time ?
                                    timestampToTime(ele.create_time, true) :
                                        ''
                                } <
                                /span> <
                                /p> <
                                /Timeline.Item> <
                                /Timeline>
                            );
                        })
                    } <
                    /Timeline.Item>
                ));

            return ( <
                div className = "archive" >
                <
                Timeline > { list } < /Timeline> { this.state.isLoading ? < LoadingCom / > : '' } <
                /div>
            );
        }
    }

    export default Archive;