import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const HttpLink = createHttpLink({
  uri: 'http://localhost:4000/'
})

const authLink = setContext((_, { headers }) => {
  const accessToken = localStorage.getItem('TOKEN')

  return {
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : ''
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(HttpLink),
  cache: new InMemoryCache()
})

export default client
