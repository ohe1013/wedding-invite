// import React from 'react';
import styled from '@emotion/styled';
import data from 'data.json';
import { BrideAndGroom } from '@/types/data.ts';

const Host = () => {
  const { groom, bride } = data.greeting.host;
  return (
    <>
      <HostContainer>
        <HostInfo person={groom} />
        <HostInfo person={bride} />
      </HostContainer>
    </>
  );
};

export default Host;

const HostInfo = ({ person }: { person: BrideAndGroom }) => {
  return (
    <HostDetails>
      <HighlightedNameContainer>
        {person.parents && (
          <>
            {person.parents.map((parent, index) => (
              <ParentName key={index}>{parent.name}</ParentName>
            ))}
          </>
        )}
      </HighlightedNameContainer>
      <RelationText>
        <div>의</div>
        <Relation>{person.relation}</Relation>
      </RelationText>
      <HighlightedName>{person.name}</HighlightedName>
    </HostDetails>
  );
};

const HighlightedNameContainer = styled.div`
  display: flex;
  flex-wrap: wrap; /* 부모 이름들을 병렬로 배치 */
  gap: 8px; /* 간격 추가 */
  justify-content: center;
  flex-direction: column;
`;

const ParentName = styled.span`
  display: inline-block; /* 인라인 블록으로 병렬 배치 */
  font-weight: 600;
  font-size: 1.2rem;
  color: #4f4f4f;
`;

const HighlightedName = styled.span`
  font-weight: 600;
  font-size: 1.2rem;
  color: #4f4f4f;
  margin-left: 12px;
`;

const HostDetails = styled.div`
  justify-content: space-between;
  justify-content: center;
  white-space: nowrap;
  display: flex;
  gap: 12px;
  text-align: center;
  align-items: center;
  font-weight: 500;
`;

const RelationText = styled.div`
  font-style: normal;
  line-height: 26px;
  width: 50px;
  display: flex;
  gap: 6px;
`;

const Relation = styled.div`
  width: inherit;
`;
const HostContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  font-family: TossFaceFontMac, serif;
`;

// const HostDetails = styled.div`
//   padding: 0 55px;
//   justify-content: center;
//   white-space: nowrap;
//   display: flex;
//   gap: 6px;
//   text-align: center;
//   align-items: center;
//   font-weight: 500;
// `;

// const RelationText = styled.div`
//   font-style: normal;
//   line-height: 26px;
//   width: 50px;
//   display: flex;
//   gap: 6px;
// `;

// const Relation = styled.div`
//   width: inherit;
// `;
