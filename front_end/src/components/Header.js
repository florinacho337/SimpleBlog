import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MenuOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import './Header.css';

const { Title } = Typography;

function Header({ openSidebar, onCancelDelete, isDeleteActive, isUpdateActive, onCancelUpdate }) {
    const [showCancelButton, setShowCancelButton] = useState(false); 

    const handleCancelClick = () => {
      if (isDeleteActive)
        onCancelDelete();
      else if (isUpdateActive)
        onCancelUpdate();
      setShowCancelButton(false);
    };

    useEffect(() => {
      setShowCancelButton(isDeleteActive || isUpdateActive);
  }, [isDeleteActive, isUpdateActive]);

    return (
      <header className="App-header">
        <div className="header-section left">
        <Button type="text" icon={<MenuOutlined style={{ fontSize: '24px' }} />} onClick={() => openSidebar(open => !open)} style={{ height: '60px', padding: '0 20px' }} />
        </div>
        <div className="header-section center">
          <Link to="/" className="title-link">
            <Title level={1} className='title'>SimpleBlog</Title>
          </Link>
        </div>
        <div className="header-section right">
        {showCancelButton && ( 
            <Button type="text" onClick={handleCancelClick} className='cancel-button'>
              Cancel
            </Button>
          )}
        </div>
      </header>
    );
}

export default Header;