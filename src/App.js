import useCmsData from './hooks/useCmsData';
import Carousel from './components/Carousel';
import { useCarousel } from './contexts/CarouselContext';
import { useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Footer from './components/Footer';
import Header from './components/Header';
import { GlobalStyle } from './styles';

function App() {
  // get carousel data
  const { setSlides, active, slides } = useCarousel();

  // get cms data
  const { content } = useCmsData();

  useEffect(() => {
    if (content) {
      setSlides(content.slides);
    } else {
      setSlides([]);
    }
  }, [content, setSlides]);

  const backgroundIndex = useMemo(() => {
    if (slides && slides[active]) {
      return slides[active].theme;
    }

    return 0;
  }, [active, slides]);

  return (
    <>
      <GlobalStyle />
      <Wrapper background={backgroundIndex}>
        <Header pagination={content && content.pagination}></Header>
        <Carousel></Carousel>
        <Footer links={content && content.footer}></Footer>
      </Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: ${(props) =>
    props.theme.backgrounds[props.background] || props.theme.backgrounds[0]};

  transition: background-color 0.3s ease-in-out;
`;

export default App;
