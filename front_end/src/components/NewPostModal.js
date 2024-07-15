import React from 'react';
import { Modal, Form, Input } from 'antd';

const NewPostModal = ({ isOpen, onClose, addFunc }) => {
  const [form] = Form.useForm();

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        addFunc(values);
        console.log('Form Values:', values);
        onClose(); 
        form.resetFields();
      })
      .catch((info) => {
        console.log('Validate Failed:', info);
      });
  };

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

  return (
    <Modal title="Write a New Post" open={isOpen} onOk={handleOk} onCancel={handleCancel} width={"85%"}>
      <Form form={form} layout="vertical">
        <Form.Item name="author" label="Author" rules={[{ required: true, message: 'Please input the author!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="title" label="Title" rules={[{ required: true, message: 'Please input the title!' }]}>
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content" rules={[{ required: true, message: 'Please input the content!' }]}>
          <Input.TextArea rows={15} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewPostModal;