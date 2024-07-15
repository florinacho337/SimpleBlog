import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Card } from 'antd';

const { Title, Paragraph, Text } = Typography;

const PostPage = () => {
  const { id: postId } = useParams();
  const post = useSelector(state => 
    state.blogPosts.find(post => post.id.toString() === postId));

  if (!post) return <Typography><Paragraph>Post not found!</Paragraph></Typography>;

  return (
    <Card style={{ margin: '20px', borderRadius: '8px' }}>
      <Typography>
        <Title level={1}>{post.title}</Title>
        <Paragraph style={{ color: 'grey' }}>
          by <Text strong>{post.author}</Text> | {new Date(post.created_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Paragraph>
        <Paragraph style={{fontSize: "25px", whiteSpace: 'pre-wrap'}}>{post.content}</Paragraph>
      </Typography>
    </Card>
  );
};

export default PostPage;
