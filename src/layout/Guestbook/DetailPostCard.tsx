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

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const Actions = styled.div`
  display: flex;
  gap: 0.5rem;
  font-size: 0.75rem;
  cursor: pointer;
  color: #007bff;

  span:hover {
    text-decoration: underline;
  }
`;

const Content = styled.pre`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #333;
  word-break: break-word;
`;

const Author = styled.span`
  font-size: 0.75rem;
  color: #555;
  text-align: end;
`;

const Timestamp = styled.span`
  font-size: 0.75rem;
  color: #888;
  text-align: end;
`;

interface DetailPostCardProps {
  post: GuestBookPost;
  onEdit?: () => void;
  onDelete?: () => void;
  props?: React.ComponentPropsWithoutRef<'div'>;
}

const DetailPostCard: React.FC<DetailPostCardProps> = ({ post, onEdit, onDelete, props }) => {
  return (
    <Card {...props}>
      <Header>
        <Actions>
          <span onClick={onEdit}>수정</span>
          <span onClick={onDelete}>삭제</span>
        </Actions>
      </Header>
      <Content>{post.content}</Content>
      <Author>- {post.name}</Author>
      <Timestamp>{'10'}</Timestamp>
    </Card>
  );
};

export default DetailPostCard;
