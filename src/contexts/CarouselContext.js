import React, { createContext, useContext, useState } from 'react';

// Creating contexts so the state and setState function can be accessible from a hook
// (Avoiding wrapper hell in the long run)

const ActiveSlideContext = createContext();
const ActiveSlideDispatchContext = createContext();
const SlidesContext = createContext();
const SlidesDisptachContext = createContext();

export function CarouselProvider({ children }) {
  const [slides, setSlides] = useState([]);
  const [active, setActive] = useState(0);

  return (
    <ActiveSlideContext.Provider value={active}>
      <ActiveSlideDispatchContext.Provider value={setActive}>
        <SlidesContext.Provider value={slides}>
          <SlidesDisptachContext.Provider value={setSlides}>
            {children}
          </SlidesDisptachContext.Provider>
        </SlidesContext.Provider>
      </ActiveSlideDispatchContext.Provider>
    </ActiveSlideContext.Provider>
  );
}

export function useCarousel() {
  const slides = useContext(SlidesContext);
  const setSlides = useContext(SlidesDisptachContext);
  const active = useContext(ActiveSlideContext);
  const setActive = useContext(ActiveSlideDispatchContext);

  if (
    slides === undefined ||
    setSlides === undefined ||
    active === undefined ||
    setActive === undefined
  ) {
    throw new Error(
      'useCarousel has to be wrapped in a <CarouselProvider> component'
    );
  }

  return {
    slides,
    setSlides,
    active,
    setActive,
  };
}
