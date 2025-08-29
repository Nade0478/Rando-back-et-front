import React from 'react';
import { Card } from 'react-bootstrap';
import ArticleForm from '../../components/blog/ArticleForm';
import OpinionForm from './OpinionForm';

const BlogForm = () => {
  return (
    <div>
      <Card style={{ padding: '20px', margin: '20px' }}>
        <ArticleForm />
      </Card>
      <Card style={{ padding: '20px', margin: '20px' }}>
        <OpinionForm /> 
      </Card>
    </div>
  );
};

export default BlogForm;
