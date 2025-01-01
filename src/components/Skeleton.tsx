import styled from '@emotion/styled';

const SkeletonWrapper = styled.div`
  background: #e0e0e0;
  height: 100px; /* 기본 높이 */
  margin: 10px 0; /* 간격 설정 */
  border-radius: 4px;
  overflow: hidden; /* 내부 내용이 넘치지 않도록 설정 */
  position: relative; /* 자식 요소의 위치를 기준으로 설정 */
  animation: pulse 1.5s infinite; /* 부드러운 애니메이션 추가 */

  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #d0d0d0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }
`;

const SkeletonContent = styled.div`
  background: rgba(255, 255, 255, 0.5);
  height: 100%; /* 기본 높이와 동일하게 설정 */
  width: 100%;
  animation: fadeIn 1.5s forwards; /* 내부 내용이 서서히 나타나도록 설정 */
  opacity: 0; /* 초기 투명도 설정 */

  @keyframes fadeIn {
    0% {
      opacity: 0;
      transform: scaleY(0.5); /* 초기 크기 축소 */
    }
    100% {
      opacity: 1;
      transform: scaleY(1); /* 최종 크기 */
    }
  }
`;

const Skeleton = () => {
  return (
    <SkeletonWrapper>
      <SkeletonContent />
    </SkeletonWrapper>
  );
};

export default Skeleton;
