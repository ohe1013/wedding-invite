import styled from '@emotion/styled';
import data from 'data.json';
import Host from '../Contact/Host.tsx';
// import RoundButton from '@/components/RoundButton.tsx';
import Button from '@/components/Button.tsx';
import { Paragraph } from '@/components/Text.tsx';

const Invitation = () => {
  const { greeting } = data;
  return (
    <InvitationWrapper>
      <Paragraph>{greeting.message}</Paragraph>
      <Host />
      {/* <Caption textAlign={'center'}>{greeting.eventDetail}</Caption> */}
      <Button
        style={{ marginTop: '3rem', marginBottom: '1rem' }}
        target="_blank"
        href={greeting.googleCalendarUrl}
        rel="noreferrer">
        구글 캘린더 추가하기
      </Button>
    </InvitationWrapper>
  );
};

export default Invitation;

const InvitationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;
