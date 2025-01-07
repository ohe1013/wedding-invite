import styled from '@emotion/styled';
import data from 'data.json';
import mainImg from '@/assets/images/13.jpg';
// import Home from './Home';

const Main = () => {
  const { greeting } = data;
  return (
    <MainContainer>
      <MainWrapper>
        <MainImg src={mainImg} />
      </MainWrapper>
      <MainTitle>
        {/* <MusicContainer>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <circle cx="11" cy="11" r="10" fill="none" stroke="#000" strokeWidth="1.5" />
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1.25"
              strokeMiterlimit="10"
              d="M8 15V7l8-1.5v8M8 9l8-1.5"
            />
            <path
              fill="none"
              stroke="#000"
              strokeWidth="1.25"
              strokeMiterlimit="10"
              d="M16 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zM8 15a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
            <line x1="19" y1="4" x2="4" y2="19" stroke="#000" strokeWidth="1.5" />
          </svg>
        </MusicContainer> */}
        {`오현근 `}
        <span style={{ color: 'red' }}>❤</span>
        {` 고은비\n결혼합니다!`}
      </MainTitle>
      <SubTitle>{greeting.eventDetail}</SubTitle>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  width: '100%';
  height: '100%';
  position: relative;
`;
// const MusicContainer = styled.div`
//   position: absolute;
//   right: 10px;
// `;

const MainWrapper = styled.div`
  display: block;
  width: 100%;
  position: relative;
`;

const MainImg = styled.img`
  width: 100%; /* 컨테이너 너비를 가득 채움 */
  height: auto; /* 세로 높이는 자동으로 조정 */
  object-fit: cover; /* 비율을 유지하며 이미지를 컨테이너에 맞춤 */
  object-position: center; /* 이미지를 중앙에 정렬 */
`;

const MainTitle = styled.p`
  font-family: TossFaceFontMac, serif;
  font-size: 1.6rem;
  color: #2f2120;
  line-height: 120%;
  white-space: pre-line;
`;

const SubTitle = styled.p`
  font-size: 1.1rem;
  color: #2f2120;
  line-height: 140%;
  white-space: pre-line;
`;
