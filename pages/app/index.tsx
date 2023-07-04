import { useSession } from "next-auth/react"
import useSWR from "swr"
import { Link } from 'next/link';

const fetcher = (...args) => fetch(...args).then(res => res.json())

const AppIndex = () => {
  const { data: session } = useSession()
  const { data } = useSWR('/api/tenants', fetcher)

  return (
    <>
      <div className="max-w-lg mx-auto text-center my-6">
        <img
          src={session?.user?.image}
          alt={session?.user?.name}
          className="rounded-full w-16 inline-block"
        />
        <h1>{session?.user?.name}</h1>
        {console.log(data)}
        {
          data && data?.map((tenant, index) => (
            <Link href="aa">
              <a>{tenant.name}</a>
            </Link>
          ))
        }
      </div>
    </>
  )
}

export default AppIndex