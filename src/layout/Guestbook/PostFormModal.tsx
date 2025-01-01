import React, { useState } from 'react';
import styled from '@emotion/styled';
import { GuestBookPostForm } from './type';
import useForm from './useForm';
import { useAddPost, useRemovePost, useUpdatePost } from './useGuestBook';
import nonPriavateImage from '@/assets/images/non-private-icon.png';
import priavateImage from '@/assets/images/private-icon.png';
import Button from '@/components/Button';
import { Heading1 } from '@/components/Text';

interface PostFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onFormValid: (data: GuestBookPostForm) => Partial<GuestBookPostForm>;
  type: 'insert' | 'update' | 'delete';
  initialValues?: GuestBookPostForm;
}

const PostFormModal: React.FC<PostFormModalProps> = ({
  isOpen,
  onClose,
  onFormValid,
  type = 'insert',
  initialValues = {
    password: '',
    name: '',
    content: '',
    timestamp: 0,
  },
}) => {
  const addPostMutation = useAddPost(); // 항상 호출
  const updatePostMutation = useUpdatePost(); // 항상 호출
  const deletePostMutation = useRemovePost();
  const mutation =
    type === 'insert'
      ? addPostMutation
      : type === 'delete'
      ? deletePostMutation
      : updatePostMutation;

  const [showPassword, setShowPassword] = useState(true);
  const { handleChange, handleSubmit, values, errors, clear } = useForm<GuestBookPostForm>({
    initialValues,
    onSubmit: (values: GuestBookPostForm) => {
      mutation.mutate(values, {
        onSuccess: () => {
          onClose();
        },
      });
    },
    validate: onFormValid,
  });

  const typeText = type === 'insert' ? '작성' : type === 'delete' ? '삭제' : '수정';

  return (
    <ModalWrapper isOpen={isOpen}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <Heading1>방명록 글 {typeText}</Heading1>
        <Form onSubmit={handleSubmit}>
          <Input
            onChange={handleChange}
            value={values.name}
            type="text"
            name="name"
            placeholder="이름"
            disabled={type === 'delete' ? true : false}
          />
          {errors.name && <TextError>{errors.name}</TextError>}
          <InputWrapper>
            <InputWithButton
              onChange={handleChange}
              value={values.password}
              type={showPassword ? 'password' : 'text'}
              name="password"
              placeholder="비밀번호"
            />
            <ToggleButton
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              type="button">
              <ToggleIcon src={showPassword ? priavateImage : nonPriavateImage}></ToggleIcon>
            </ToggleButton>
          </InputWrapper>
          {errors.password && <TextError>{errors.password}</TextError>}
          <TextArea
            onChange={handleChange}
            value={values.content}
            placeholder="내용"
            name="content"
            rows={4}
            disabled={type === 'delete' ? true : false}
          />
          <ButtonWrapper>
            <Button as="button" type="submit">
              {typeText}
            </Button>
            <Button
              onClick={() => {
                clear();
                onClose();
              }}>
              취소
            </Button>
          </ButtonWrapper>
        </Form>
      </ModalContent>
    </ModalWrapper>
  );
};

export default PostFormModal;
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
  z-index: 1001;
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
const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;
const InputWithButton = styled.input`
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
  padding-right: 2.5rem; /* 버튼 공간 확보 */
`;

const ToggleButton = styled.button`
  position: absolute;
  right: 0.5rem; /* Input 오른쪽에 여백 추가 */
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  color: #666;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;
const ToggleIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  opacity: 0.5;
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
  height: 20vh;
`;

const TextError = styled.p`
  padding: 0;
  margin-top: -0.7rem;
  margin-bottom: -0.5rem;
  color: #f37177;
  font-size: small;
  text-align: left;
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
