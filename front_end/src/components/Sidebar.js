import React, { useState } from 'react';
import './Sidebar.css';
import { EditOutlined, DeleteOutlined, FileAddOutlined, CloseOutlined } from '@ant-design/icons';
import NewPostModal from './NewPostModal';

const Sidebar = ({ isOpen, setIsOpen, initiateDeleteOperation, addFunc, initiateUpdateOperation }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <button onClick={() => setIsModalVisible(true)}><FileAddOutlined /> Write a New Post</button>
      <button onClick={() => { setIsOpen(false); initiateDeleteOperation(); }}><DeleteOutlined /> Delete a Post</button>
      <button onClick={() => { setIsOpen(false); initiateUpdateOperation(); }}><EditOutlined /> Update Post</button>
      <button onClick={() => setIsOpen(false)}><CloseOutlined /> Close</button>
      <NewPostModal isOpen={isModalVisible} onClose={() => setIsModalVisible(false)} addFunc={addFunc} />
    </div>
  );
};

export default Sidebar;