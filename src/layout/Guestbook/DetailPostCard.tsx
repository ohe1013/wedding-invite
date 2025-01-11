/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { GuestBookPost } from './type';

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
          <Button onClick={onEdit}>🔧</Button>
          <Button onClick={onDelete}>🗑️</Button>
        </Actions>
      </Header>
      <Content>{post.content}</Content>
      <Author>- {post.name}</Author>
      <Timestamp>
        {' '}
        {new Date(post.timestamp).toLocaleDateString('ko-KR', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
      </Timestamp>
    </Card>
  );
};

export default DetailPostCard;
const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  padding: 1rem;
  width: auto;
  min-width: 9rem;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row-reverse;
`;

const Content = styled.pre`
  margin: 0.5rem 0;
  font-size: 0.875rem;
  color: #333;
  word-break: break-word;
  min-height: 6rem;
  white-space: pre-wrap;
`;

const Author = styled.span`
  font-size: 0.75rem;
  color: #555;
  text-align: end;
`;

const Timestamp = styled.span`
  font-size: 0.5rem;
  color: #888;
  text-align: end;
`;

const Actions = styled.div`
  position: absolute;
  right: 0.5re;
  display: flex;
  gap: 0.1rem;
  font-size: 0.75rem;
  cursor: pointer;
  color: #007bff;
`;
const Button = styled.button`
  //font-family: TossFaceFontMac, serif;
  padding: 0.1em 0.2em;
  border-radius: 8px;

  outline: none;
  box-shadow: none;
  font-size: 0.9rem;
  cursor: pointer;
  background: white;
  display: flex;
  align-items: center;
  color: #1a1a1a;
  text-decoration: none;
  gap: 2px;
`.withComponent('a');
