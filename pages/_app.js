import { CacheProvider  } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import PropTypes from 'prop-types'

import createEmotionCache from '../utility/emotionCache'
import theme from '../styles/theme'
import '../styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, emotionCahe = clientSideEmotionCache, pageProps }) {
  return <CacheProvider value={emotionCahe}>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Component {...pageProps} />
    </ThemeProvider>
  </CacheProvider>
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
