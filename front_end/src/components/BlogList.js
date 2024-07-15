import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { List, Card, Typography, Row, Col, Modal, Pagination, Tag } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import './BlogList.css';

const { Title, Paragraph } = Typography;
const { confirm } = Modal;

const BlogList = ({ isDeleteActive, executeDelete, isUpdateActive, prepareUpdate }) => {
  const navigate = useNavigate();
  const blogPosts = useSelector((state) => state.blogPosts);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 4;

  const paginatedPosts = blogPosts.slice(0, -1);
  paginatedPosts.reverse();

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = paginatedPosts.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (page) => {
    setCurrentPage(page);
  };

  const handlePostClick = (event, postId) => {
    if (isDeleteActive || isUpdateActive) {
      event.preventDefault(); 
      event.stopPropagation(); 
    }

    const post = blogPosts.find((post) => post.id === postId);
    if (isDeleteActive) {
      confirm({
        title: 'Are you sure?',
        content: 'This action cannot be undone.',
        onOk() {
          executeDelete(postId);
          navigate('/');
        },
      });
    }
    if (isUpdateActive) {
      console.log('Post:', post);
      prepareUpdate(post);
    }

  };

  return (
    <>
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={blogPosts.slice(-1)}
        renderItem={post => (
          <List.Item>
            <Link to={`/blog/${post.id}`} className="blogLink">
              <Card
                onClick={(event) => handlePostClick(event, post.id)} 
                hoverable 
                className="newestPostCard"
                extra={<Tag color='red' className='modernTag'>NEW POST</Tag>}
              >
                <Row align="middle">
                  <Col span={24}>
                    <Title level={1} className="postTitle">{post.title}</Title>
                    <Paragraph ellipsis className="postContent" style={{whiteSpace: 'pre-wrap', fontSize: "24px"}}>
                      {post.content}
                    </Paragraph>
                  </Col>
                </Row>
              </Card>
            </Link>
          </List.Item>
        )}
      />
      <Row gutter={[16, 16]} justify="center">
        {currentPosts.map(post => (
          <Col key={post.id} xs={24} sm={12} md={6}>
            <Link to={`/blog/${post.id}`} className="blogLink">
              <Card
                onClick={(event) => handlePostClick(event, post.id)}
                hoverable 
                className="postCard"
              >
                <Title level={4} className="postTitle">{post.title}</Title>
                <Paragraph ellipsis className="postContent" style={{whiteSpace: 'pre-wrap'}}>
                  {post.content}
                </Paragraph>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      <Pagination
        current={currentPage}
        onChange={paginate}
        total={paginatedPosts.length}
        pageSize={postsPerPage}
        className='ant-pagination'
      />
    </>
  );
};

export default BlogList;