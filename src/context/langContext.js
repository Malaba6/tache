import { createContext, useEffect, useState } from 'react'

export const LangContext = createContext(['', () => {}])

export const LangProvider = ({ children, locale }) => {
  const [lang, setLang] = useState(locale)
  console.log('LangProvider ', lang, locale)

  return <LangContext.Provider value={[lang, setLang]}>
      { children }
  </LangContext.Provider>
}