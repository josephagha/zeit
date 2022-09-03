import { SessionProvider } from "next-auth/react"
import '../styles/globals.scss'
import type { AppProps } from 'next/app'


export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session} refetchInterval={0}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}