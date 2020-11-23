import React, { useMemo } from 'react';
import styled from 'styled-components';
import { useCarousel } from '../../contexts/CarouselContext';
import { Container } from '../../styles';

export default function Header({ pagination = {} }) {
  const { active, slides } = useCarousel();
  const title = useMemo(() => {
    if (
      slides[active] &&
      slides[active].pagination_id !== undefined &&
      pagination &&
      pagination.titles
    ) {
      return pagination.titles[slides[active].pagination_id];
    }

    return null;
  }, [active, pagination, slides]);

  return (
    <HeaderWrapper>
      <HeaderContainer>
        {title && <Title>{title}</Title>}
        <Pagination>
          {slides.map((_slide, index) => {
            return <Dot key={`dot-${index}`} isActive={index === active}></Dot>;
          })}
        </Pagination>
      </HeaderContainer>
    </HeaderWrapper>
  );
}

const HeaderWrapper = styled.header`
  padding: 30px 0;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ theme }) => theme.darkFont};
  opacity: ${(props) => (props.isActive ? 1 : 0.5)};
  border-radius: 50%;
  transition: opacity 0.3s ease-in-out;
`;

const Pagination = styled.div`
  display: flex;

  ${Dot}:not(:last-child) {
    margin-right: 15px;
  }
`;

const HeaderContainer = styled(Container)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.span`
  margin-bottom: 10px;
  font-size: 14px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
`;
