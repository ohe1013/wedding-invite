/** @jsxImportSource @emotion/react */
import React, { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { realtimeDb } from 'firebase';
import { onValue, orderByChild, query, ref } from 'firebase/database';
import DetailPostCard from './DetailPostCard';
import PostFormModal from './PostFormModal';
import { GuestBookPostForm } from './type';
import { postValidation } from './useForm';
import Skeleton from '@/components/Skeleton';
import { Heading1 } from '@/components/Text';

interface AllPostsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AllPostsModal: React.FC<AllPostsModalProps> = ({ isOpen, onClose }) => {
  const [posts, setPosts] = useState<GuestBookPostForm[]>([]);
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [selectPost, setSelectPost] = useState<GuestBookPostForm | null>(null);
  const [type, setType] = useState<'update' | 'delete'>('update');
  useEffect(() => {
    const guestBookRef = ref(realtimeDb, 'guestbook');
    const q = query(guestBookRef, orderByChild('timestamp'));
    onValue(q, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(
          Object.entries(snapshot.val() as GuestBookPostForm[])
            .map((item) => ({
              id: item[0],
              ...item[1],
            }))
            .reverse(),
        );
      } else {
        setPosts([]);
      }
    });
  }, []);
  const handleFormModalClose = () => setIsFormModalOpen(false);
  const onEditHandler = (post: GuestBookPostForm) => {
    setType('update');
    setIsFormModalOpen(!isFormModalOpen);
    setSelectPost({ ...post, password: '' });
  };

  const onDeleteHandler = (post: GuestBookPostForm) => {
    setType('delete');
    setIsFormModalOpen(!isFormModalOpen);
    setSelectPost({ ...post, password: '' });
  };

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent onClick={(e) => e.stopPropagation()} isFormModalOpen={isFormModalOpen}>
        <HeaderWrapper isFormModalOpen={isFormModalOpen}>
          <CloseButton onClick={onClose}>×</CloseButton>
          <Heading1>방명록</Heading1>
        </HeaderWrapper>
        <ContentWrapper>
          {posts.length === 0 ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            posts.map((post) => (
              <div key={post.id}>
                <DetailPostCard
                  post={post}
                  onEdit={() => onEditHandler(post)}
                  onDelete={() => onDeleteHandler(post)}></DetailPostCard>
              </div>
            ))
          )}
        </ContentWrapper>
      </ModalContent>
      {isFormModalOpen && selectPost && (
        <PostFormModal
          isOpen={isFormModalOpen}
          onClose={handleFormModalClose}
          onFormValid={postValidation}
          initialValues={selectPost}
          type={type}
        />
      )}
    </ModalWrapper>
  );
};

export default AllPostsModal;

const ModalWrapper = styled.div<{ isOpen: boolean }>`
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
  @media (max-width: 768px) {
    width: 90vw;
    max-width: 90vw;
  }
  position: relative;
  max-height: 80vh;
  overflow-y: scroll;
  width: 500px;
  max-width: 500px;
  background: #fff;
  border-radius: 0.5rem;
  padding: 0 2rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow-y: ${({ isFormModalOpen }: { isFormModalOpen: boolean }) =>
    isFormModalOpen ? 'hidden' : 'scroll'};
`;
const HeaderWrapper = styled.div<{ isFormModalOpen: boolean }>`
  position: sticky; /* 스크롤 시 고정 */
  top: 0; /* 모달이 열리면 top을 auto로 설정 */
  background: white; /* 배경색 설정 */
  z-index: 1000; /* 다른 요소 위에 표시되도록 설정 */
  padding: 10px; /* 여백 설정 */
`;
const CloseButton = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 0.5rem;
  right: -0.5rem;
  cursor: pointer;
  font-size: 1.5rem;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 95%;
  margin: 0 auto;
`;
