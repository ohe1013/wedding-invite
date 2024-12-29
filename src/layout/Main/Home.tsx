import styled from '@emotion/styled';
import mainImg from '@/assets/images/main.jpg';

const Section = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  margin: 0 auto;
  position: relative;
  width: 100%;
  height: 600px;
`;

// const SaveDateLink = styled.a`
//   display: block;
//   text-align: center;
//   text-decoration: underline;
//   color: white;
//   text-shadow: 0 3px 3px rgba(0, 0, 0, 0.8);
//   margin-bottom: 0.5rem;
// `;

const CoupleName = styled.span`
  display: inline-block;
  font-size: 2rem;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.7);
  padding: 0.5rem 1rem;
  color: #1f2937; /* gray-900 */
`;

// const BorderBox = styled.div`
//   position: absolute;
//   left: 1rem;
//   right: 1rem;
//   top: 1rem;
//   bottom: 0;
//   border: 1px solid #e5e7eb; /* gray-200 */
// `;

const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
`;

// const DateInfo = styled.h1`
//   text-align: center;
//   font-size: 1.25rem; /* text-xl */
//   margin: 1rem 0;
// `;

// const VenueInfo = styled.h2`
//   text-align: center;
//   font-size: 1.25rem; /* text-xl */
// `;

const ContentWrapper = styled.div`
  margin: 3rem 1rem 3.5rem;
`;

const HeaderContainer = styled.div`
  position: absolute;
  left: 50%;
  top: 4rem;
  text-align: center;
  transform: translateX(-50%);
  width: 100%;
  z-index: 10;

  @media (min-width: 768px) {
    top: 10rem;
  }
`;

function Home() {
  return (
    <Section>
      <Container>
        <HeaderContainer>
          {/* <SaveDateLink
            href="https://calendar.google.com/calendar/u/0/r/eventedit?dates=20221015T040000Z/20221015T060000Z&location=%EB%AC%B8%EA%B2%BD%EA%B4%80%EA%B4%91%ED%98%B8%ED%85%94,%20%EB%8C%80%ED%95%9C%EB%AF%BC%EA%B5%AD%20%EA%B2%BD%EC%83%81%EB%B6%81%EB%8F%84%20%EB%AC%B8%EA%B2%BD%EC%8B%9C%20%EB%AC%B8%EA%B2%BD%EC%9D%8D%20%EC%83%88%EC%9E%AC2%EA%B8%B8%2032-11&text=%EC%9D%B8%ED%98%B8+%26+%EC%95%84%EB%A6%84+%EA%B2%B0%ED%98%BC%EC%8B%9D"
            title="Save the date for the wedding"
            target="_blank"
            rel="noreferrer">
            Save the date for the wedding
          </SaveDateLink> */}
          <CoupleName>
            현근 <span style={{ fontSize: '1.25rem' }}>&</span> 은비
          </CoupleName>
        </HeaderContainer>
        {/* <BorderBox /> */}
        <ImageWrapper>
          <Image src={mainImg} alt="메인 이미지" />
        </ImageWrapper>
        <ContentWrapper>
          {/* <DateInfo>2022. 10. 15. SAT PM 1:00</DateInfo>
          <VenueInfo>문경관광호텔 무궁화홀</VenueInfo> */}
        </ContentWrapper>
      </Container>
    </Section>
  );
}

export default Home;
