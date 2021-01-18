import Link from 'next/link'
import { useRouter } from 'next/router'
import navigation from '../fixtures/navigation'

function Sidebar() {
  const { pathname } = useRouter()

  return (
    <aside className="bg-white-100 dark:bg-black-900 py-5 min-h-screen w-1/3 xl:w-1/5">
      <div className="px-5">
        <div>
          <p className="text-2xl font-bold">CRM Clients</p>
        </div>

        <nav className="mt-4">
          <ul>
            {navigation.map((item, index) => (
              <li
                key={index}
                className={`p-2 mb-2 border ${
                  pathname === item.link
                    ? 'border-gray-300 dark:border-gray-600 bg-white dark:bg-black-800'
                    : 'border-transparent'
                }`}
              >
                <Link href={item.link}>
                  <a className="block">{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  )
}

export default Sidebar
