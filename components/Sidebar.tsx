import Link from 'next/link'
import { useRouter } from 'next/router'
import navigation from '../fixtures/navigation'

function Sidebar() {
  const { pathname } = useRouter()

  return (
    <aside className="relative bg-white dark:bg-black-900">
      <div className="flex flex-col sm:flex-row sm:justify-around">
        <div className="w-72 h-screen">
          <div className="flex items-center justify-start mx-6 mt-10">
            <span className="text-gray-600 dark:text-gray-300 ml-4 text-2xl font-bold">
              CRM Client
            </span>
          </div>
          <nav className="mt-10 px-6 ">
            <ul>
              {navigation.map((item, index) => (
                <li key={index}>
                  <Link href={item.link}>
                    <a className="hover:text-gray-800 hover:bg-gray-100 flex items-center p-2 my-6 transition-colors dark:hover:text-white dark:hover:bg-gray-600 duration-200  text-gray-600 dark:text-gray-400 rounded-lg ">
                      <span className="mx-4 text-lg font-normal">
                        {item.name}
                      </span>
                      <span className="flex-grow text-right"></span>
                    </a>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
