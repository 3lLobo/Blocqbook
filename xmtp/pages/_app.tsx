import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'

const AppWithoutSSR = dynamic(() => import('../components/App.tsx'), {
  ssr: false,
})

function AppWrapper({ Component, pageProps }: AppProps) {
  return (
    <AppWithoutSSR>
      <Component {...pageProps} />
    </AppWithoutSSR>
  )
}

export default AppWrapper
