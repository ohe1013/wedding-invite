import styled from '@emotion/styled';
import data from 'data.json';
import mainImg from '@/assets/images/main.jpg';
// import Home from './Home';

const Main = () => {
  const { greeting } = data;
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MainWrapper>
        <MainImg src={mainImg} />
      </MainWrapper>
      <MainTitle>
        {`오현근 `}
        <span style={{ color: 'red' }}>❤</span>
        {` 고은비\n결혼합니다!`}
      </MainTitle>
      <SubTitle>{greeting.eventDetail}</SubTitle>
    </div>
  );
};

export default Main;

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
  font-size: 2rem;
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
