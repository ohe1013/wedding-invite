import styled from '@emotion/styled';
import data from 'data.json';
import { toast } from 'react-toastify';
import Kakao from '@/types/kakao';
interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ShareModal = (props: ShareModalProps) => {
  const { isOpen, onClose } = props;
  const { mapInfo } = data;
  function sendLink() {
    if (!Kakao.isInitialized()) {
      Kakao.init(import.meta.env.VITE_APP_KAKAO_KEY as string);
    }
    Kakao.Link.sendDefault({
      objectType: 'feed',
      content: {
        title: '현근 은비, 결혼합니다',
        description: '2025년 5월 10일 (토) 오후 5시 50분\n보타닉파크 웨딩홀',
        imageUrl: 'https://wedding-invite-teal.vercel.app/mainImg.jpg',
        link: {
          mobileWebUrl: 'https://wedding-invite-teal.vercel.app',
          webUrl: 'https://wedding-invite-teal.vercel.app',
        },
      },
      buttons: [
        {
          title: '초대장 보기',
          link: {
            mobileWebUrl: 'https://wedding-invite-teal.vercel.app',
            webUrl: 'https://wedding-invite-teal.vercel.app',
          },
        },
        {
          title: '위치 보기',
          link: {
            mobileWebUrl: mapInfo.defaultMap,
            webUrl: mapInfo.defaultMap,
          },
        },
      ],
    });
  }
  const handleKakaoButton = () => {
    sendLink();
  };

  const handleLinkButton = () => {
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast.success('주소가 복사되었습니다.😉😉');
      },
      () => {
        toast.error('주소 복사에 실패했습니다.🥲🥲');
      },
    );
  };
  return (
    <ModalWrapper isOpen={isOpen} onClick={onClose}>
      <ModalContent>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))' }}>
          <Button onClick={handleKakaoButton}>
            <img
              src="/kakaotalk.png"
              alt="카카오톡 공유 보내기 버튼"
              width={50}
              height={50}
              style={{ margin: 'auto' }}
            />
            카카오톡
          </Button>
          <Button onClick={handleLinkButton}>
            <img
              src="/link.png"
              alt="링크 공유 보내기 버튼"
              width={50}
              height={50}
              style={{ margin: 'auto' }}
            />
            주소 복사
          </Button>
        </div>
      </ModalContent>
    </ModalWrapper>
  );
};

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
  width: 60%;
  max-width: 500px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  color: #1a1a1a;
`;
const Button = styled.button`
  display: flex;
  flex-direction: column;
  background: none;
  border: none;
  font-faimily: TossFaceFontMac;
`;
