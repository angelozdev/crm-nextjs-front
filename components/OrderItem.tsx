import * as React from 'react'

/* Types */
import { Order, StatusesOrder } from 'types'

/* Fixtures */
import statusOptions from 'fixtures/statusOptions'

/* Utils */
import { formatedPrice } from 'utils'

interface Props extends Partial<Order> {}
type ChangeSelect = React.ChangeEvent<HTMLSelectElement>

function OrderItem({ client, products, status, total }: Props): JSX.Element {
  // States
  const [statusOrder, setStatusOrder] = React.useState<string>(status)

  const { first_name, last_name, email, phone_number } = client

  const classesByStatus = (status: StatusesOrder | string) => {
    switch (status) {
      case StatusesOrder.CANCELLED: {
        return 'border-red-800'
      }
      case StatusesOrder.COMPLETED: {
        return 'border-green-700'
      }
      case StatusesOrder.PENDING: {
        return 'border-yellow-600'
      }
    }
  }

  // Methods
  const onChangeStatus = (e: ChangeSelect): void => {
    setStatusOrder(e.target.value)
  }

  return (
    <li
      className={`p-4 w-full bg-black-900 mb-2 rounded-lg border-t ${classesByStatus(
        statusOrder
      )}`}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="">
          <h2 className="text-2xl font-semibold">
            Client: {first_name} {last_name}
          </h2>
          <div className="my-4">
            <p className="flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                width="24"
                height="24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="ml-2">{email}</span>
            </p>

            {phone_number && (
              <p className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  width="24"
                  height="24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
                <span className="ml-2">{phone_number}</span>
              </p>
            )}
          </div>

          <select
            onChange={onChangeStatus}
            className="btn primary mt-4"
            value={statusOrder}
          >
            {statusOptions.map((option) => {
              return (
                <option value={option.value} key={option.value}>
                  {option.label}
                </option>
              )
            })}
          </select>
        </div>
        <div className="">
          <h3 className="font-semibold">Summary:</h3>
          <div className="text-gray-400">
            {products.map((product, index) => {
              return (
                <div key={`${product.product.id}${index}`}>
                  <p>Product: {product.product.name}</p>
                  <p>Quantity: {product.quantity}</p>
                </div>
              )
            })}
          </div>

          <p className="mt-4 font-semibold">
            Total a pagar:
            <span className="font-light"> {formatedPrice(total)}</span>
          </p>

          <button className="btn error mt-4">
            <span className="px-4">DELETE</span>
          </button>
        </div>
      </div>
    </li>
  )
}

export default OrderItem
