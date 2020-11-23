import React from 'react';
import sanitize from 'sanitize-html';
import styled from 'styled-components';
import { Container } from '../../styles';
import { useCarousel } from '../../contexts/CarouselContext';
import Form from '../Form';
import breakpoint from 'styled-components-breakpoint';

export default function Carousel() {
  const { slides, active } = useCarousel();

  return (
    <CarouselWrapper>
      <Slider active={active}>
        {slides &&
          slides.map(
            ({ id, heading, description, image, groups, template }) => {
              return (
                <Slide key={`slide-${id}`}>
                  <SlideContainer template={template}>
                    <Content>
                      {heading && (
                        <Title
                          dangerouslySetInnerHTML={{
                            __html: sanitize(heading),
                          }}
                        ></Title>
                      )}

                      {description && (
                        <Description
                          dangerouslySetInnerHTML={{
                            __html: sanitize(description),
                          }}
                        ></Description>
                      )}
                    </Content>
                    {(image || groups) && (
                      <RightContent>
                        {image && <Image src={image.url} alt={image.alt} />}
                        {groups && <Form inputs={groups}></Form>}
                      </RightContent>
                    )}
                  </SlideContainer>
                </Slide>
              );
            }
          )}
      </Slider>
    </CarouselWrapper>
  );
}

const CarouselWrapper = styled.main`
  flex-grow: 1;
  overflow: hidden;
  display: flex;
  text-align: center;

  ${breakpoint('md')`text-align: left;`}
`;

const Slide = styled.section`
  width: 100vw;
  flex-shrink: 0;
  display: flex;

  ${breakpoint('md')`align-items: center;`}
`;

const SlideContainer = styled(Container)`
  display: flex;
  align-items: center;
  flex-direction: column;

  ${breakpoint('md')`
    justify-content: space-between;
    flex-direction: ${(props) =>
      props.template === 'ImageLeftLockup' ? 'row-reverse' : 'row'};`}
`;

const Slider = styled.div`
  display: flex;
  transform: translateX(${(props) => props.active * -100}vw);
  transition: transform 0.3s ease-in-out;
  align-items: stretch;
  will-change: transform;
`;

const Title = styled.h1`
  font-size: 32px;
  line-height: 1.2;
  margin-bottom: 32px;
  text-transform: uppercase;
  padding: 0 5px;

  ${breakpoint('md')`
  padding: 0;
  `}

  ${breakpoint('lg')`
  font-size: 57px;
  `}
`;

const Description = styled.h2`
  font-weight: normal;
  font-size: 16px;
  line-height: 1.2;

  ${breakpoint('lg')`
  font-size: 36px;
  `}

  a {
    font-weight: bold;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-bottom: 32px;

  ${breakpoint('md')`
  width: 50%;
  margin-bottom: 0;
  `}
`;

const RightContent = styled.div`
  ${breakpoint('md')`width: ${(5 / 12) * 100}%;`}
`;

const Image = styled.img`
  flex-grow: 0;
`;
