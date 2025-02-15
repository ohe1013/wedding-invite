import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import { realtimeDb } from 'firebase';
import { limitToLast, onValue, orderByChild, query, ref } from 'firebase/database';

import AllPostsModal from './AllPostsModal';
import PostFormModal from './PostFormModal';
import SimplePostCard from './SimplePostCard';
import { GuestBookPost } from './type';
import { postValidation } from './useForm';
import Button from '@/components/Button';

const limit = 7;
function GuestBook() {
  const [isFormModalOpen, setIsFormModalOpen] = useState<boolean>(false);
  const [isPostsModalOpen, setIsPostsModalOpen] = useState<boolean>(false);
  const [posts, setPosts] = useState<GuestBookPost[]>([]);

  const handleFormModalOpen = () => {
    setIsFormModalOpen(true);
  };
  const handleFormModalClose = () => setIsFormModalOpen(false);

  const handleAllPostsModalOpen = () => {
    setIsPostsModalOpen(true);
  };
  const handleAllPostsModalClose = () => setIsPostsModalOpen(false);

  useEffect(() => {
    const guestBookRef = ref(realtimeDb, 'guestbook');
    const q = query(guestBookRef, orderByChild('timestamp'), limitToLast(limit));
    onValue(q, (snapshot) => {
      if (snapshot.exists()) {
        setPosts(
          Object.entries(snapshot.val() as GuestBookPost[])
            .map((item) => item[1])
            .reverse(),
        );
      } else {
        setPosts([]);
      }
    });
  }, []);

  useEffect(() => {
    if (isFormModalOpen || isPostsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isFormModalOpen, isPostsModalOpen]);

  return (
    <Section>
      <Container>
        <div>
          {posts && posts.length === 0 ? (
            <PostsContainer>
              <SimplePostCard
                props={{
                  style: {
                    justifyContent: 'center',
                    width: '12rem',
                    minWidth: '12rem',
                    fontWeight: 600,
                  },
                  onClick: handleFormModalOpen,
                }}
                type={'contentOnly'}
                post={{
                  content: '아직 아무 글도 없어요. \n새 글을 남겨보세요!\n',
                  name: '',
                  timestamp: 0,
                }}
              />
            </PostsContainer>
          ) : (
            <PostsContainer>
              {posts.map((post, _idx) => (
                <SimplePostCard key={post.name + _idx} post={post} />
              ))}
              {posts.length === limit && (
                <SimplePostCard
                  props={{
                    style: {
                      justifyContent: 'center',
                    },
                    onClick: handleAllPostsModalOpen,
                  }}
                  type={'contentOnly'}
                  post={{
                    content: '방명록 \n더 보러가기☺️\n',
                    name: '',
                    timestamp: 0,
                  }}
                />
              )}
            </PostsContainer>
          )}
          <ButtonWrapper>
            <Button onClick={handleFormModalOpen}>새 글 작성</Button>
            <Button onClick={handleAllPostsModalOpen}>전체보기</Button>
          </ButtonWrapper>
        </div>
      </Container>
      <PostFormModal
        isOpen={isFormModalOpen}
        onClose={handleFormModalClose}
        onFormValid={postValidation}
        type="insert"
      />
      {isPostsModalOpen && (
        <AllPostsModal isOpen={isPostsModalOpen} onClose={handleAllPostsModalClose} />
      )}
    </Section>
  );
}

export default GuestBook;
// 스타일 정의
const Section = styled.div`
  width: 100%;
  display: flex;
  // overflow-x: auto;
`;
const PostsContainer = styled.div`
  @media (max-width: 768px) {
    width: 90vw;
    max-width: 90vw;
  }
  width: 500px;
  max-width: 500px;
  overflow-x: auto;
  display: flex;
  gap: 12px;
  height: 16rem;
  padding: 0.5rem 0;
  position: relative;

  &::-webkit-scrollbar {
    height: 0.5rem;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 0.25rem;
    background: #ccc;
  }
`;

// const Title = styled.h1`
//   font-size: 1.875rem; /* 3xl */
//   text-align: center;
// `;

const Container = styled.div`
  width: 100%;
  max-width: 32rem;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

// const EmptyState = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   width: 100%;
//   height: 16rem;
//   padding: 1rem 0;
//   position: relative;
//   text-align: center;
// `;

// const LoadMoreButton = styled.button`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   gap: 0.5rem;
//   background: none;
//   border: none;
//   cursor: pointer;

//   &:hover {
//     text-decoration: underline;
//   }
// `;
const ButtonWrapper = styled.div`
  margin-top: 0.3rem;
  display: flex;
  flex-direction: row-reverse;
  margin-right: 5%;
  gap: 8px;
`;
