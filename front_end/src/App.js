import React, { useState, useEffect } from 'react';
import './App.css';
import BlogList from './components/BlogList';
import PostPage from './components/PostPage';
import { useDispatch } from 'react-redux';
import { fetchBlogPosts, addBlogPost, removeBlogPost, updateBlogPost as updateReducer } from './redux/reducer';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { Modal } from 'antd';
import { updateBlogPost, deleteBlogPost, createBlogPost } from './utils/rest-calls';
import UpdatePostModal from './components/UpdatePostModal';

function App() {
  const dispatch = useDispatch();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDeleteActive, setIsDeleteActive] = useState(false);
  const [isUpdateActive, setIsUpdateActive] = useState(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState(false);
  const [selectedPostForUpdate, setSelectedPostForUpdate] = useState(null);

  useEffect(() => {
    dispatch(fetchBlogPosts());
  }, [dispatch]);

  const initiateDeleteOperation = () => {
    setIsSidebarOpen(false);
    setIsDeleteActive(true);
    Modal.info({
      title: 'Delete Post',
      content: (
        <div>
          <p>Please select a post to delete.</p>
        </div>
      ),
      onOk() {},
    });
  };

  const initiateUpdateOperation = () => {
    setIsSidebarOpen(false);
    setIsUpdateActive(true); 
    Modal.info({
      title: 'Update Post',
      content: (
        <div>
          <p>Please select a post to update.</p>
        </div>
      ),
      onOk() {},
    });
  };
  
  const cancelUpdateOperation = () => {
    setIsUpdateActive(false); 
  };

  const cancelDelete = () => {
    setIsDeleteActive(false);
  }

  const executeDelete = (postId) => {
    deleteBlogPost(postId).then(() => {
      dispatch(removeBlogPost({ id: postId }));
    }).catch((error) => {
      console.error('Error deleting blog post:', error);
    });
    setIsDeleteActive(false); 
  };

  const executeAdd = (values) => {
    setIsSidebarOpen(false);
    createBlogPost(values).then((response) => {
      dispatch(addBlogPost(response));
    }).catch((error) => {
      console.error('Error creating blog post:', error);
    });
  }

  const prepareUpdate = (post) => {
    setSelectedPostForUpdate(post);
    setIsUpdateModalVisible(true);
  }

  const executeUpdate = (values) => {
    updateBlogPost(values).then((response) => {
      dispatch(updateReducer(response));
    }).catch((error) => {
      console.error('Error updating blog post:', error);
    });
  }

  const handleCloseUpdateModal = () => {
    setSelectedPostForUpdate(null);
    setIsUpdateModalVisible(false);
    setIsUpdateActive(false);
  }

  return (
    <Router>
      <div className='App'>
        <Header openSidebar={setIsSidebarOpen} onCancelDelete={cancelDelete} isDeleteActive={isDeleteActive} isUpdateActive={isUpdateActive} onCancelUpdate={cancelUpdateOperation} />
        <div className={`background-shade ${isSidebarOpen ? 'show' : ''}`} onClick={() => setIsSidebarOpen(false)}></div>
        <Sidebar 
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          initiateDeleteOperation={initiateDeleteOperation}
          addFunc={executeAdd}
          initiateUpdateOperation={initiateUpdateOperation}
        />
        <Routes>
          <Route exact path="/" element={<BlogList 
                                          isDeleteActive={isDeleteActive} 
                                          executeDelete={executeDelete} 
                                          isUpdateActive={isUpdateActive} 
                                          prepareUpdate={prepareUpdate}
                                        />} />
          <Route path="/blog/:id" element={<PostPage />} />
        </Routes>
        {selectedPostForUpdate && 
          <UpdatePostModal
            isVisible={isUpdateModalVisible}
            post={selectedPostForUpdate}
            onClose={handleCloseUpdateModal}
            updateFunc={executeUpdate}
          />
        }
      </div>
    </Router>
  );
}

export default App;