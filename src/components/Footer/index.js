import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Container } from '../../styles';
import { useCarousel } from '../../contexts/CarouselContext';
import breakpoint from 'styled-components-breakpoint';

export default function Footer({ links = {} }) {
  const { slides, active, setActive } = useCarousel();

  const nextSlide = useCallback(() => {
    if (active < slides.length - 1) {
      setActive(active + 1);
    }
  }, [active, setActive, slides]);

  const prevSlide = useCallback(() => {
    if (active > 0) {
      setActive(active - 1);
    }
  }, [active, setActive]);

  return (
    <FooterWrapper>
      <FooterContainer>
        <LinkContainer>
          {Object.keys(links).map((key) => (
            <a
              key={links[key].label}
              href={links[key].url}
              target="_blank"
              rel="noreferrer"
            >
              {links[key].label}
            </a>
          ))}
        </LinkContainer>
        {slides.length ? (
          <ButtonContainer role="navigation">
            {slides[active].back && slides[active].back.label && (
              <Button
                onClick={prevSlide}
                aria-label={slides[active].back.label}
              >
                {slides[active].back.label}
              </Button>
            )}
            {slides[active].next && slides[active].next.label && (
              <Button
                dark
                onClick={nextSlide}
                aria-label={slides[active].next.label}
              >
                {slides[active].next.label}
              </Button>
            )}
          </ButtonContainer>
        ) : null}
      </FooterContainer>
    </FooterWrapper>
  );
}

const FooterWrapper = styled.footer`
  padding: 32px 0;
`;

const FooterContainer = styled(Container)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column-reverse;

  ${breakpoint('md')`flex-direction: row;`}
`;

const LinkContainer = styled.div`
  text-transform: uppercase;
  margin-top: 32px;

  a:not(:last-child) {
    margin-right: 10px;
  }

  ${breakpoint('md')`margin-top: 0;`}
`;

const ButtonContainer = styled.nav`
  display: flex;
  flex-direction: column-reverse;

  ${breakpoint('md')`flex-direction: row;`}

  ${Button} {
    width: 100%;

    ${breakpoint('md')`width: auto;`}
  }

  ${Button}:not(:first-child) {
    margin-bottom: 14px;

    ${breakpoint('md')`margin-bottom: 0;`}
  }

  ${Button}:not(:last-child) {
    ${breakpoint('md')`
    margin-right: 14px;
    margin-bottom: 0;`}
  }
`;
