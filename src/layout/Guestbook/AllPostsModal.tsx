/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { realtimeDb } from 'firebase';
import { onValue, ref } from 'firebase/database';
import { GuestBookPostForm } from './type';
import { useRemovePost } from './useGuestBook';
import { Heading1 } from '@/components/Text';

const ModalWrapper = styled.div`
  display: ${({ isOpen }: { isOpen: boolean }) => (isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 0.5rem;
  padding: 2rem;
  width: 90vw;
  max-width: 90vw;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 1rem;
  right: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
`;

interface AllPostsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllPostsModal: React.FC<AllPostsModalProps> = ({ isOpen, onClose }) => {
  const [posts, setPosts] = useState<GuestBookPostForm[]>([]);
  useEffect(() => {
    const guestBookRef = ref(realtimeDb, 'guestbook');

    onValue(guestBookRef, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(
          Object.entries(snapshot.val() as GuestBookPostForm[]).map((item) => ({
            id: item[0],
            ...item[1],
          })),
        );
      } else {
        setPosts([]);
      }
    });
  }, []);

  const remove = useRemovePost();

  return (
    <ModalWrapper isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Heading1>방명록</Heading1>
        {posts.map((post) => (
          <div key={post.id}>
            <div onClick={() => remove.mutate({ postId: post.id!, inputPassword: post.password })}>
              {post.id}
            </div>
            <div>{post.content}</div>
          </div>
        ))}
      </ModalContent>
    </ModalWrapper>
  );
};

export default AllPostsModal;
