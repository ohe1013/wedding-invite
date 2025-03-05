import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
import { increment, onValue, ref, update } from 'firebase/database';
import { realtimeDb } from 'firebase.ts';
import JSConfetti from 'js-confetti';
import { toast } from 'react-toastify';
import Heart from '@/assets/icons/heart_plus.svg?react';
import Music from '@/assets/icons/music.svg?react';
import MusicOff from '@/assets/icons/musicOff.svg?react';
import Share from '@/assets/icons/share.svg?react';
import Upward from '@/assets/icons/upward.svg?react';
import Button from '@/components/Button.tsx';
import Kakao from '@/types/kakao';

const FloatingBar = ({
  isVisible,
  isPlayingMusic,
  onMusicHandler,
}: {
  isVisible: boolean;
  isPlayingMusic: boolean;
  onMusicHandler: () => void;
}) => {
  const { emojis, mapInfo } = data;

  const [count, setCount] = useState(0);

  useEffect(() => {
    const dbRef = ref(realtimeDb, 'likes');
    onValue(dbRef, (snapshot) => {
      setCount(Number(snapshot.val()));
    });
    if (!Kakao.isInitialized()) {
      Kakao.init('8f6a3a6692992e864c974b216adbbbcc');
    }
  }, []);
  function sendLink() {
    if (!Kakao.isInitialized()) {
      Kakao.init('8f6a3a6692992e864c974b216adbbbcc');
    }
    Kakao.Link.sendDefault({
      objectType: 'location',
      address: '서울특별시 강남구 삼성동 123-45',
      addressTitle: '웨딩홀 위치',
      content: {
        title: '현근 은비, 결혼합니다',
        description: '2025년 5월 10일 (토) 오후 5시 50분',
        imageUrl: 'https://wedding-invite-teal.vercel.app/assets/13-a28ba209.jpg',
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
            mobileWebUrl: mapInfo.naverMap,
            webUrl: mapInfo.naverMap,
          },
        },
      ],
    });
  }
  const handleCopy = () => {
    sendLink();
    navigator.clipboard.writeText(window.location.href).then(
      () => {
        toast.success('주소가 복사되었습니다.😉😉');
      },
      () => {
        toast.error('주소 복사에 실패했습니다.🥲🥲');
      },
    );
  };

  const handleCount = () => {
    void jsConfetti.addConfetti({ emojis });

    // 버튼 클릭시 likes 수 증가
    const dbRef = ref(realtimeDb);
    void update(dbRef, {
      likes: increment(1),
    });
  };

  const jsConfetti = new JSConfetti();
  const handleScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Nav isVisible={true}>
      <Button onClick={handleCount}>
        <Heart fill="#e88ca6" />
        {count || ''}
      </Button>
      <Button onClick={onMusicHandler}>
        {isPlayingMusic ? <Music fill="#e88ca6" /> : <MusicOff fill="#e88ca6" />}
        음악
      </Button>
      <Button onClick={handleCopy}>
        <Share fill="#e88ca6" />
        공유
      </Button>
      {isVisible ? (
        <Button onClick={handleScroll}>
          <Upward fill="#e88ca6" />
          위로
        </Button>
      ) : null}
    </Nav>
  );
};

export default FloatingBar;

const Nav = styled.nav<{ isVisible: boolean }>`
  min-width: 280px;
  position: fixed;
  bottom: 30px;
  left: 0;
  right: 0;
  align-items: center;
  justify-content: center;
  gap: 5px;
  display: ${(props) => (props.isVisible ? 'flex' : 'none')};
`;
