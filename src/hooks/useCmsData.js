import { useState, useEffect } from 'react';

export default function useCmsData() {
  // using one state to avoid multiple rerenders
  const [state, setState] = useState({});

  useEffect(() => {
    // set loading state to true
    setState((prevState) => ({ ...prevState, loading: true, error: '' }));

    const getCmsData = async () => {
      try {
        const response = await fetch('/mock-api.json');
        let { content } = await response.json();

        // getting values out of the content object, so all slides have the same structure
        if (content && content.slides) {
          content.slides = content.slides.map((slide) => {
            const newSlide = { ...slide, ...slide.content };

            return newSlide;
          });
        }

        setState({
          content,
          // Return error message if retrieved data is undefined
          error: content ? '' : 'CMS Data not found 😭',
          loading: false,
        });
      } catch (e) {
        // Return error message if there was an error with fetching content
        console.error(e);
        setState({
          content: undefined,
          error: 'Whoops! Server Error 😬',
          loading: false,
        });
      }
    };

    getCmsData();
  }, [setState]);

  return state;
}
