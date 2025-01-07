import { useEffect, useRef } from 'react';

export const BackgroundMusic = ({ isMusic }: { isMusic: boolean }) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio && isMusic) {
      audio.volume = 0.5; // 볼륨 설정 (0~1)
      audio.play().catch(() => {
        console.log('자동 재생이 차단되었습니다.');
      });
    } else if (audio && !isMusic) {
      audio.pause();
    }
  }, [isMusic]);

  return (
    <audio ref={audioRef} autoPlay>
      <source src={`/ourStory.mp3`} />
      브라우저가 오디오 태그를 지원하지 않습니다.
    </audio>
  );
};
