import * as React from 'react'

/* Next */
import Head from 'next/head'
import { useRouter } from 'next/router'

/* Components */
import { Sidebar } from '@components/index'
import routes from '../constants/routes'

/* Types */
interface Props {
  children: React.ReactNode
}

function Layout({ children }: Props): JSX.Element {
  const { pathname } = useRouter()
  let content: React.ReactNode
  const isForm = pathname === routes.LOGIN || pathname === routes.SIGNUP

  if (isForm) {
    content = (
      <div className="flex flex-col justify-center items-center min-h-screen px-4 ">
        <div className="w-full max-w-sm">{children}</div>
      </div>
    )
  } else {
    content = (
      <div className="flex">
        <Sidebar />
        <main className="bg-white w-2/3 xl:w-4/5 p-5 dark:bg-black-800">
          {children}
        </main>
      </div>
    )
  }

  return (
    <React.Fragment>
      <Head>
        <title>CRM - Next Application</title>
      </Head>
      <div className="min-h-screen dark:text-white-100 dark:bg-black-800">
        {content}
      </div>
    </React.Fragment>
  )
}

export default Layout
