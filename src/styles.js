import styled, { createGlobalStyle } from 'styled-components';
import breakpoint from 'styled-components-breakpoint';

export const theme = {
  backgrounds: ['#B5E5CF', '#74BDCB', '#FFA384', '#EFE7BC'],
  darkFont: '#000',
  lightFont: '#fff',
  breakpoints: {
    md: 768,
    lg: 1024,
    xl: 1200,
  },
};

export const GlobalStyle = createGlobalStyle`
  body {
    font-size: 16px;
    font-family: Arial, sans-serif;
    color: #000;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  a:active,
  a:focus {
    text-decoration: underline;
  }
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
`;

export const Button = styled.button`
  padding: 12px 42px;
  border-radius: 60px;
  border: 2px solid ${({ theme }) => theme.darkFont};
  background-color: ${({ theme, dark }) =>
    dark ? theme.darkFont : 'transparent'};
  color: ${({ theme, dark }) => (dark ? theme.lightFont : theme.darkFont)};
  text-transform: uppercase;
  cursor: pointer;

  ${breakpoint('lg')`font-size: 24px`}
`;
