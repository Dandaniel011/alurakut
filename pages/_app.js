import { createGlobalStyle, ThemeProvider } from 'styled-components'
import { AlurakutStyles } from "../src/lib/alurakutCommons"

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: sans-serif;
    background-color: #D0E6F6;
    background-image: url("https://images5.alphacoders.com/100/1002716.jpg") ;
    background-size: 100% 139%;
  }

  #_next {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  ${AlurakutStyles}
`

const theme = {
  colors: {
    primary: 'red',
  },
}

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
