import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function Layout({ children }) {
  const { auth } = usePage().props;
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-bold text-xl text-green-600">
              Nature Blog
            </Link>

            <div className="flex items-center gap-4">
              {auth?.user ? (
                <>
                  <Link
                    href="/posts/create"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Создать пост
                  </Link>
                  <Link
                    href="/profile"
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Профиль
                  </Link>
                  <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    {auth.user.name}
                  </button>
                  {showMenu && (
                    <div className="absolute right-4 top-16 bg-white shadow rounded">
                      <Link
                        href="/profile/edit"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Редактировать Профиль
                      </Link>
                      <form method="post" action="/logout" className="p-0">
                        <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                        <button
                          type="submit"
                          className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Выйти
                        </button>
                      </form>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-600 hover:text-gray-900">
                    Войти
                  </Link>
                  <Link
                    href="/register"
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
                  >
                    Регистрация
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
