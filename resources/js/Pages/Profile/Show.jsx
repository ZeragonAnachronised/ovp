import { Head, Link } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Show({ user, posts }) {
  return (
    <Layout>
      <Head title="Profile" />
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-6 rounded shadow mb-6">
          <h1 className="text-3xl font-bold mb-2">{user.name}</h1>
          <p className="text-gray-600 mb-4">{user.email}</p>
          <Link
            href="/profile/edit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Редактировать профиль
          </Link>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Мои посты ({posts.length})</h2>
          {posts.length > 0 ? (
            <div className="space-y-4">
              {posts.map((post) => (
                <div key={post.id} className="bg-white p-4 rounded shadow">
                  <h3 className="text-xl font-bold mb-2">
                    <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-700 mb-2">{post.content.substring(0, 100)}...</p>
                  <div className="flex gap-4 text-sm text-gray-500 mb-2">
                    <span>💬 {post.comments?.length || 0}</span>
                    <span>❤️ {post.likes?.length || 0}</span>
                  </div>
                  <div className="flex gap-2">
                    <Link
                      href={`/posts/${post.id}/edit`}
                      className="px-3 py-1 bg-yellow-600 text-white rounded text-sm"
                    >
                      Редактировать
                    </Link>
                    <form method="post" action={`/posts/${post.id}`} style={{ display: 'inline' }}>
                      <input type="hidden" name="_method" value="delete" />
                      <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                      <button type="submit" className="px-3 py-1 bg-red-600 text-white rounded text-sm">
                        Удалить
                      </button>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">Вы еще не создали ни одного поста</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
