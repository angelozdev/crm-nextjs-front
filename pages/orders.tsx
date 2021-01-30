/* NEXT */
import Link from 'next/link'

/* COMPONENTS */
import Layout from '@components/Layout'

/* Constants */
import routes from 'constants/routes'

function Orders() {
  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Orders</h1>
        <Link href={routes.NEW_ORDER}>
          <a className="btn primary inline-block mb-5">
            <span className="mx-4">New Order</span>
          </a>
        </Link>
      </div>
    </Layout>
  )
}

export default Orders
