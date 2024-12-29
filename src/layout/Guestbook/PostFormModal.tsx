import React from 'react';
import styled from '@emotion/styled';
import { GuestBookPostForm } from './type';
import useForm from './useForm';
import { useAddPost } from './useGuestBook';
import Button from '@/components/Button';
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
  width: 90%;
  max-width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

const TextArea = styled.textarea`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
`;

// const Button = styled.button`
//   background-color: #007bff;
//   color: #fff;
//   border: none;
//   padding: 0.75rem;
//   border-radius: 0.25rem;
//   cursor: pointer;

//   &:hover {
//     background-color: #0056b3;
//   }
// `;
const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  margin-right: 5%;
  gap: 8px;
`;
interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFormValid: (data: GuestBookPostForm) => Partial<GuestBookPostForm>;
}

const PostFormModal: React.FC<PostFormModalProps> = ({ isOpen, onClose, onFormValid }) => {
  const addPostMutation = useAddPost();
  const { handleChange, handleSubmit, values } = useForm<GuestBookPostForm>({
    initialValues: {
      password: '',
      name: '', // 모든 필드를 초기화
      content: '',
    },
    onSubmit: addPostMutation.mutate,
    validate: onFormValid,
  });

  return (
    <ModalWrapper isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Heading1>방명록 글 작성</Heading1>
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            value={values.name}
            type="text"
            name="name"
            placeholder="이름"
          />
          <Input
            onChange={handleChange}
            value={values.password}
            type="password"
            name="password"
            placeholder="비밀번호"
          />
          <TextArea
            onChange={handleChange}
            value={values.content}
            placeholder="내용"
            name="content"
            rows={4}
          />
          <ButtonWrapper>
            <Button as="button" type="submit">
              작성하기
            </Button>
            <Button onClick={onClose}>닫기</Button>
          </ButtonWrapper>
        </Form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PostFormModal;
