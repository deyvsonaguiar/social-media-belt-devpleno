import Seo from '@/components/seo'
import Link from 'next/link'
import { signIn, signOut, useSession } from 'next-auth/react'


export default function Home(props) {
  const { data: session } = useSession()

  return (
    <div>
      <Seo title='Social Media Belt - DevPleno' description='Tutorial Saas do Zero' />
      <ul>
        <li><Link href='/app'>App</Link></li>
        <li><Link href='/devpleno'>Tenant devpleno</Link></li>
      </ul>
      <p>
        <button onClick={() => signIn()}>Sign in</button>
      </p>
      <p>
        Signed in as {session?.user?.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </p>
    </div>
  )
}
