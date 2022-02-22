import { useEffect } from 'react'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import Home from 'components/pages/Home'
import useLang from 'hooks/useLang'

export default function HomePage({ locale }) {
  const [lang, setLang] = useLang()

  useEffect(() => {
    console.log('HomePage', locale)
    setLang(locale)
  }, [locale])

  return <Home locale={locale} />
}

export async function getStaticProps({ locale }) {
  console.log('Static props ', locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['home', 'common'])),
      locale,
    }
  }
}
