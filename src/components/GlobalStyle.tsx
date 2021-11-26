import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  body {
    min-height: 100%;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
  }

  html {
    height: 100%;
  }

  #root, body {
    position: relative;
    min-height: 100%;
  }

  #root {
    margin: 0 auto;
    max-width: 1440px;
  }

  * {
    box-sizing: border-box;
  }
  
  input {
    outline: none;
    border: none;
  }
  
  a {
    text-decoration: none;
  }
  
  a:visited {
    color: inherit;
  }
`;

export default GlobalStyle;
