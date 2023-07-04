import LayoutApp from '@/components/Layout/LayoutApp'
import LayoutPublic from '@/components/Layout/LayoutPublic'
import LayoutTenant from '@/components/Layout/LayoutTenant'
import LayoutEmpty from '@/components/Layout/LayoutEmpty'
import '@/styles/globals.css'
import { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {

  const router = useRouter()
  const { pathname } = router
  let Layout = LayoutPublic
  if (pathname.indexOf('/app') === 0) {
    Layout = LayoutApp
  }
  if (pathname.indexOf('/[slug]') === 0) {
    Layout = LayoutTenant
  }
  if (pathname === '/app') {
    Layout = LayoutEmpty
  }

  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
