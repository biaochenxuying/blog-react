import React, { Component } from 'react';
import { Modal, Input } from 'antd';
const { TextArea } = Input;

class ChildrenComment extends Component {
  render() {
    return (
      <Modal
        title="评论"
        style={{ top: '25%' }}
        visible={this.props.visible}
        onCancel={this.props.handleCancel}
        onOk={this.props.handleOk}
        width={600}
      >
        <div className="">
          <TextArea
            rows={4}
            name="content"
            placeholder="文明社会，理性评论"
            value={this.props.content}
            onChange={this.props.handleChange}
          />
        </div>
      </Modal>
    );
  }
}

export default ChildrenComment;
