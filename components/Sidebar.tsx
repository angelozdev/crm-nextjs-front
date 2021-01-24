/* Next */
import Link from 'next/link'
import { useRouter } from 'next/router'

/* Constants */
import routes from 'constants/routes'

/* Fixtures */
import navigation from '../fixtures/navigation'

function Sidebar() {
  const router = useRouter()
  const { pathname } = router

  // Methods
  const handleClick = () => {
    localStorage.removeItem('TOKEN')
    router.push(routes.LOGIN)
  }

  return (
    <aside className="relative bg-white-100 dark:bg-black-900">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="w-72 lg:w-96 h-screen">
          <div className="flex items-center justify-start mx-6 mt-10">
            <h1 className="text-blue-800 ml-4 text-2xl font-bold">
              CRM Client
            </h1>
          </div>
          <nav className="mt-10 px-6 ">
            <p className="text-gray-400 dark:text-gray-600 dark:border-gray-600 ml-2 w-full border-b pb-2 border-gray-400 mb-4 text-md font-normal">
              Pages
            </p>
            <ul>
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>
                    <a
                      className={`${
                        pathname === item.link &&
                        'bg-blue-800 text-white shadow-md'
                      } hover:text-white hover:shadow-md hover:bg-blue-800 flex items-center p-2 my-2 transition-colors duration-200 rounded-lg`}
                    >
                      <span className="mx-4 text-lg font-normal">
                        {item.name}
                      </span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-gray-400 dark:text-gray-600 dark:border-gray-600 ml-2 w-full border-b pb-2 border-gray-400 mb-4 text-md font-normal">
              Other
            </p>
            <ul>
              <li>
                <button
                  onClick={handleClick}
                  className={`w-full hover:text-white hover:shadow-md hover:bg-blue-800 flex items-center p-2 my-2 transition-colors duration-200 rounded-lg`}
                >
                  <span className="mx-4 text-lg font-normal">Logout</span>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
