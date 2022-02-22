import { CacheProvider  } from '@emotion/react'
import { CssBaseline } from '@mui/material'
import PropTypes from 'prop-types'
import AdapterMoment from '@mui/lab/AdapterMoment'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { appWithTranslation } from 'next-i18next'

import createEmotionCache from 'utils/emotionCache'
import { ColorModeProvider } from 'context/themeContext'
import { AuthProvider } from 'context/useAuth'
import { LangProvider } from 'context/langContext'
import 'styles/globals.css'

const clientSideEmotionCache = createEmotionCache()

function MyApp({ Component, emotionCahe = clientSideEmotionCache, pageProps }) {
  const { locale } = pageProps
  console.log('MyApp _app.js locale ', locale)
  return <CacheProvider value={emotionCahe}>
    <LangProvider locale={locale}>
      <AuthProvider>
        <ColorModeProvider>
          <LocalizationProvider locale={locale} dateAdapter={AdapterMoment}>
            <CssBaseline />
            <Component {...pageProps} />
          </LocalizationProvider>
        </ColorModeProvider>
      </AuthProvider>
    </LangProvider>
  </CacheProvider>
}

export default appWithTranslation(MyApp)

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  emotionCache: PropTypes.object,
  pageProps: PropTypes.object.isRequired,
}
