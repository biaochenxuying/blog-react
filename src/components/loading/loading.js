import React, { Component } from 'react';
import { Spin } from 'antd';

class LoadingCom extends Component {
	render() {
		const style = {
			color: '#999',
			textAlign: 'center',
			padding: 50,
			fontSize: 16,
		};
		return (
			<div style={style}>
				<Spin size="large" />
			</div>
		);
	}
}

export default LoadingCom;
