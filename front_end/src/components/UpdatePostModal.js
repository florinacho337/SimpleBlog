import React from 'react';
import { Modal, Form, Input } from 'antd';

const UpdatePostModal = ({ isVisible, post, onClose, updateFunc}) => {
  const [form] = Form.useForm();

  const handleCancel = () => {
    if (form.isFieldsTouched()) {
      Modal.confirm({
        title: 'Are you sure you want to close?',
        content: 'You have unsaved changes. Closing this form will lose all changes.',
        onOk: () => {
          onClose();
          form.resetFields();
        },
      });
    } else {
      onClose();
    }
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        updateFunc({...post, ...values});
        onClose(); 
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

  return (
    <Modal title="Update Post" open={isVisible} onCancel={handleCancel} onOk={handleOk} width={"85%"}>
      <Form form={form} initialValues={{ title: post.title, author: post.author, content: post.content }}>
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="author" label="Author">
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Input.TextArea rows={15} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;