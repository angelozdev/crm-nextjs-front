import * as React from 'react'

/* Components */
import { Layout, Spinner } from 'components'
import { AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area } from 'recharts'

/* Graphql */
import { useQuery } from '@apollo/client'
import { GET_TOP_SELLERS } from 'graphql/queries'
import { GetTopSellers } from 'types'

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
]

/************************** Main component *****************************/
function TopSellers() {
  const { data, loading } = useQuery<GetTopSellers>(GET_TOP_SELLERS)

  // Conditionals
  if (loading) return <Spinner />
  const { getTopSellers } = data

  const sellersForChar = new Array(getTopSellers.length)

  getTopSellers.map((seller, index) => {
    sellersForChar[index] = {
      ...seller.seller[0],
      total: seller.total,
      totalOrders: seller.totalOrders
    }
  })

  console.log(sellersForChar)

  return (
    <Layout>
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl mb-5">Top Sellers</h1>
        <div className="my-8">
          <AreaChart
            width={600}
            height={250}
            data={sellersForChar}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="rgb(30, 64, 175)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="rgb(30, 64, 175)"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>
            <XAxis dataKey="first_name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="total"
              stroke="rgb(30, 64, 175)"
              fillOpacity={1}
              fill="url(#colorUv)"
            />
          </AreaChart>
        </div>
      </div>
    </Layout>
  )
}

export default TopSellers
