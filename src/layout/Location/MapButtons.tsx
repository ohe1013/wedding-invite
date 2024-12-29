import styled from '@emotion/styled';
import data from 'data.json';
import googleIcon from '@/assets/images/google_map_icon.png';
import kakaoIcon from '@/assets/images/kakao_map_icon.png';
import naverIcon from '@/assets/images/naver_map_icon.png';
import tmapIcon from '@/assets/images/tmap_icon.png';

const MapButtons = () => {
  const { naverMap, kakaoMap, tMapMap, googleMap } = data.mapInfo;

  return (
    <MapButtonWrapper>
      <Button onClick={() => window.open(naverMap)}>
        <Image src={naverIcon}></Image>
      </Button>
      <Button onClick={() => window.open(kakaoMap)}>
        <Image src={kakaoIcon}></Image>
      </Button>
      <Button onClick={() => window.open(googleMap)}>
        <Image src={googleIcon}></Image>
      </Button>
      <Button onClick={() => window.open(tMapMap)}>
        <Image src={tmapIcon}></Image>
      </Button>
    </MapButtonWrapper>
  );
};

export default MapButtons;

const MapButtonWrapper = styled.div`
  margin: 8px;
  display: flex;

  /* justify-content: center; */
  justify-content: space-evenly;
`;

const Button = styled.div``;

const Image = styled.img`
  width: 3rem; /* w-12 */
  height: 3rem; /* h-12 */
  border-radius: 0.75rem; /* rounded-xl */
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1); /* shadow-lg */
`;
