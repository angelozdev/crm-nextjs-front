import { AppProps } from 'next/dist/next-server/lib/router/router'
import '../styles/globals.css'

/* Apollo and GraphQL */
import { ApolloProvider } from '@apollo/client'
import client from 'graphql/client'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}

export default MyApp
