import Seo from '@/components/seo'
import Link from 'next/link'


export default function Home() {
  return (
    <div>
      <Seo title='Social Media Belt - DevPleno' description='Tutorial Saas do Zero' />
      <ul>
        <li><Link href='/app'>App</Link></li>
        <li><Link href='/devpleno'>Tenant devpleno</Link></li>
      </ul>
    </div>
  )
}
