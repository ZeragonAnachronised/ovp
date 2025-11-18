import { Head, Link, usePage } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Index({ posts, user }) {
  return (
    <Layout>
      <Head title="Nature Blog" />
      <div className="space-y-6">
        <h1 className="text-3xl font-bold">Недавние посты</h1>

        {posts.data && posts.data.length > 0 ? (
          posts.data.map((post) => (
            <div key={post.id} className="bg-white p-6 rounded shadow">
              {post.image && (
                <img
                  src={`/storage/${post.image}`}
                  alt={post.title}
                  className="w-full h-64 object-cover rounded mb-4"
                />
              )}
              <h2 className="text-2xl font-bold mb-2">
                <Link href={`/posts/${post.id}`} className="text-blue-600 hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="text-gray-600 text-sm mb-2">От {post.user.name}</p>
              <p className="text-gray-700 mb-4">{post.content.substring(0, 150)}...</p>
              <div className="flex gap-4 text-sm text-gray-500">
                <span>💬 {post.comments?.length || 0} комментариев</span>
                <span>❤️ {post.likes?.length || 0} лайков</span>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">Постов пока нет</p>
        )}

        {posts.links && (
          <div className="flex justify-center gap-2">
            {posts.links.map((link, idx) => (
              <Link
                key={idx}
                href={link.url || '#'}
                className={`px-3 py-1 rounded ${
                  link.active ? 'bg-green-600 text-white' : 'bg-gray-200'
                }`}
                dangerouslySetInnerHTML={{ __html: link.label }}
              />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
