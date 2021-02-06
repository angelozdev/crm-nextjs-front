import * as React from 'react'

/* Types */
import { Order } from 'types'

/* Components */
import { OrderItem } from 'components'

/* Types */
interface Props {
  orders: Order[]
}

function OrderList({ orders }: Props): JSX.Element {
  if (orders.length === 0) {
    return <p>There are no orders for now.</p>
  }

  return (
    <ul className="container mx-auto">
      <div className="">
        {orders.map((order) => {
          const { client, products, status, total } = order
          return (
            <OrderItem
              key={order.id}
              client={client}
              products={products}
              status={status}
              total={total}
            />
          )
        })}
      </div>
    </ul>
  )
}

export default OrderList
