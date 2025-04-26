import { useEffect, useRef } from 'react';

export const BackgroundMusic = ({
  isPlayingMusic,
  onMusicHandler,
}: {
  isPlayingMusic: boolean;
  onMusicHandler: (isPlayingMusic: boolean) => void;
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return; // audio가 없으면 조기 반환

    audio.volume = 0.5; // 볼륨 설정 (0~1)
    isPlayingMusic
      ? audio.play().catch(() => console.log('자동 재생이 차단되었습니다.'))
      : audio.pause();
  }, [isPlayingMusic]);

  return (
    <audio ref={audioRef} onEnded={() => onMusicHandler(false)} loop>
      <source src={`https://wedding-audio-proxy.wedding-audio.workers.dev/ourStory.mp3`} />
      브라우저가 오디오 태그를 지원하지 않습니다.
    </audio>
  );
};
