/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { realtimeDb } from 'firebase';
import { onValue, ref } from 'firebase/database';
import DetailPostCard from './DetailPostCard';
import { GuestBookPostForm } from './type';
import { useRemovePost } from './useGuestBook';
import { Heading1 } from '@/components/Text';
import PostFormModal from './PostFormModal';
import { postValidation } from './useForm';

interface AllPostsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllPostsModal: React.FC<AllPostsModalProps> = ({ isOpen, onClose }) => {
  const [posts, setPosts] = useState<GuestBookPostForm[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [selectPost, setSelectPost] = useState<GuestBookPostForm | null>(null);
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
  const handleFormModalClose = () => setIsFormModalOpen(false);
  const onEditHandler = (post: GuestBookPostForm) => {
    setIsFormModalOpen(!isFormModalOpen);
    setSelectPost(post);
  };

  // const remove = useRemovePost();

  return (
    <ModalWrapper isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Heading1>방명록</Heading1>
        <ContentWrapper>
          {posts.map((post) => (
            <div key={post.id}>
              <DetailPostCard
                post={post}
                onEdit={() => onEditHandler(post)}
                // onDelete={remove.mutate}
              ></DetailPostCard>
            </div>
          ))}
        </ContentWrapper>
      </ModalContent>
      {isFormModalOpen && selectPost && (
        <PostFormModal
          isOpen={isFormModalOpen}
          onClose={handleFormModalClose}
          onFormValid={postValidation}
          initialValues={selectPost}
          type="update"
        />
      )}
    </ModalWrapper>
  );
};

export default AllPostsModal;

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

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;
