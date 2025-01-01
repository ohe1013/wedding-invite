/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { GuestBookPost } from './type';

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  width: 9rem;
  min-width: 9rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Content = styled.pre`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #333;
  word-break: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const Author = styled.span`
  font-size: 0.75rem;
  color: #555;
  text-align: end;
`;

interface SimplePostCardProps {
  post: GuestBookPost;
  props?: React.ComponentPropsWithoutRef<'div'>;
  type?: 'normal' | 'contentOnly';
}

const SimplePostCard: React.FC<SimplePostCardProps> = ({ post, props, type = 'normal' }) => {
  return (
    <Card {...props}>
      <Content>{post.content}</Content>
      {type === 'normal' ? <Author>- {post.name}</Author> : null}
    </Card>
  );
};

export default SimplePostCard;
