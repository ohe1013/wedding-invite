import { useEffect, useRef, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NavermapsProvider } from 'react-naver-maps';
import { ToastContainer, Zoom } from 'react-toastify';
// import Button from '@/components/Button.tsx';
import { Heading1 } from '@/components/Text.tsx';
import Wrapper from '@/components/Wrapper.tsx';
import Account from '@/layout/Account/Account.tsx';
import { BackgroundMusic } from '@/layout/BackgroundMusic/BackgroundMusic';
import Container from '@/layout/Container.tsx';
import FloatingBar from '@/layout/FloatingBar/FloatingBar.tsx';
import GalleryWrap from '@/layout/Gallery/GalleryWrap.tsx';
import Guestbook from '@/layout/Guestbook/Guestbook.tsx';
import Invitation from '@/layout/Invitation/Invitation.tsx';
import Location from '@/layout/Location/Location.tsx';
import Main from '@/layout/Main/Main.tsx';
// import Button from './components/Button';
function App() {
  const ncpClientId = import.meta.env.VITE_APP_NAVERMAPS_CLIENT_ID as string;
  const queryClient = new QueryClient();
  const [isVisible, setIsVisible] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', checkScrollPosition);
    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, []);

  const checkScrollPosition = () => {
    if (locationRef.current) {
      const { offsetTop } = locationRef.current;
      const scrollPosition = window.scrollY;

      if (scrollPosition >= offsetTop) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    }
  };

  return (
    <NavermapsProvider ncpClientId={ncpClientId}>
      <QueryClientProvider client={queryClient}>
        <Container>
          <Wrapper style={{ paddingTop: '0px' }}>
            <Main />
          </Wrapper>
          <Wrapper>
            <Heading1>모시는 글</Heading1>
            <Invitation />
          </Wrapper>
          <Wrapper>
            <Heading1>Gallery</Heading1>
            <GalleryWrap />
          </Wrapper>
          <Wrapper>
            <Heading1>마음 전하실 곳</Heading1>
            <Account />
          </Wrapper>
          <Wrapper ref={locationRef}>
            <Heading1>오시는 길</Heading1>
            <Location />
          </Wrapper>
          <Wrapper>
            <Heading1>방명록</Heading1>
            <Guestbook />
          </Wrapper>
          {/* <Wrapper>
            <Heading1>은비현근 결혼식</Heading1>
            <Button target="_blank" rel="noreferrer" href="https://hg-eb-wedding.vercel.app/">
              구경가기
            </Button>
          </Wrapper> */}
          <FloatingBar
            isVisible={isVisible}
            isPlayingMusic={isPlayingMusic}
            onMusicHandler={() => setIsPlayingMusic((prev) => !prev)}
          />
          <Wrapper>
            <div style={{ height: '15vh' }}></div>
          </Wrapper>
        </Container>
        <BackgroundMusic
          isPlayingMusic={isPlayingMusic}
          onMusicHandler={(isPlayingMusic: boolean) => setIsPlayingMusic(isPlayingMusic)}
        />
        <ToastContainer transition={Zoom} style={{ top: '1rem' }} />
      </QueryClientProvider>
    </NavermapsProvider>
  );
}

export default App;
