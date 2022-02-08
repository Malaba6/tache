import { CacheProvider  } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import PropTypes from 'prop-types'
import AdapterMoment from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'

import createEmotionCache from '@utils/emotionCache'
import theme from '@styles/theme'
import { ColorModeProvider } from '@context/themeContext'
import { AuthProvider } from '@context/useAuth'
import '@styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, emotionCahe = clientSideEmotionCache, pageProps }) {
  return <CacheProvider value={emotionCahe}>
    <AuthProvider>
      <ColorModeProvider>
        <LocalizationProvider dateAdapter={AdapterMoment}>
          <CssBaseline />
          <Component {...pageProps} />
        </LocalizationProvider>
      </ColorModeProvider>
    </AuthProvider>
  </CacheProvider>
}

export default MyApp

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
