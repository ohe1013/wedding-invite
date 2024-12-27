/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';

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
  return (
    <ModalWrapper isOpen={isOpen} onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <h2>방명록</h2>
      </ModalContent>
    </ModalWrapper>
  );
};

export default AllPostsModal;
