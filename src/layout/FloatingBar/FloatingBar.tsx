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

const FloatingBar = ({
  isVisible,
  isMusic,
  onMusicHandler,
}: {
  isVisible: boolean;
  isMusic: boolean;
  onMusicHandler: () => void;
}) => {
  const { emojis } = data;

  const [count, setCount] = useState(0);

  useEffect(() => {
    const dbRef = ref(realtimeDb, 'likes');
    onValue(dbRef, (snapshot) => {
      setCount(Number(snapshot.val()));
    });
  }, []);

  const handleCopy = () => {
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
    <Nav isVisible={isVisible}>
      <Button onClick={handleCount}>
        <Heart fill="#e88ca6" />
        {count || ''}
      </Button>
      <Button onClick={onMusicHandler}>
        {isMusic ? <Music fill="#e88ca6" /> : <MusicOff fill="#e88ca6" />}
        음악
      </Button>
      <Button onClick={handleCopy}>
        <Share fill="#e88ca6" />
        공유
      </Button>
      <Button onClick={handleScroll}>
        <Upward fill="#e88ca6" />
        위로
      </Button>
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
