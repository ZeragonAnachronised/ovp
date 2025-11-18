import { Head, Link, useForm, usePage, router } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { useState } from 'react';

export default function Show({ post, user }) {
  const { auth } = usePage().props;
  const [showCommentForm, setShowCommentForm] = useState(false);
  const { data, setData, post: submitForm } = useForm({
    content: '',
  });

  const isLiked = post.likes.some((like) => like.user_id === user?.id);
  const isOwner = user?.id === post.user_id;

  const submitComment = (e) => {
    e.preventDefault();
    submitForm(`/posts/${post.id}/comments`, {
      onSuccess: () => {
        setData('content', '');
        window.location.reload();
      },
    });
  };

  const toggleLike = () => {
    router.get(`/posts/${post.id}/like`)
  };

  return (
    <Layout>
      <Head title={post.title} />
      <div className="max-w-2xl mx-auto">
        <div className="bg-white p-6 rounded shadow mb-6">
          {post.image && (
            <img
              src={`/storage/${post.image}`}
              alt={post.title}
              className="w-full h-96 object-cover rounded mb-4"
            />
          )}
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
          <p className="text-gray-600 text-sm mb-4">От {post.user.name}</p>
          <p className="text-gray-700 mb-6">{post.content}</p>

          <div className="flex gap-4 items-center border-t pt-4">
            <button
              onClick={toggleLike}
              className={`px-4 py-2 rounded ${
                isLiked ? 'bg-red-600 text-white' : 'bg-gray-200'
              }`}
            >
              ❤️ {post.likes.length}
            </button>

            {user?.id && (
              <button
                onClick={() => setShowCommentForm(!showCommentForm)}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                💬 Комментировать
              </button>
            )}

            {isOwner && (
              <>
                <Link
                  href={`/posts/${post.id}/edit`}
                  className="px-4 py-2 bg-yellow-600 text-white rounded"
                >
                  Редактировать
                </Link>
                <form method="post" action={`/posts/${post.id}`} style={{ display: 'inline' }}>
                  <input type="hidden" name="_method" value="delete" />
                  <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                  <button type="submit" className="px-4 py-2 bg-red-600 text-white rounded">
                    Удалить
                  </button>
                </form>
              </>
            )}
          </div>
        </div>

        {showCommentForm && user?.id && (
          <form onSubmit={submitComment} className="bg-white p-4 rounded shadow mb-6">
            <textarea
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              placeholder="Write a comment..."
              className="w-full px-3 py-2 border border-gray-300 rounded mb-2"
              rows="3"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Прокомментировать
            </button>
          </form>
        )}

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Комментарии ({post.comments.length})</h2>
          {post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <div key={comment.id} className="bg-white p-4 rounded shadow">
                <p className="font-bold text-sm">{comment.user.name}</p>
                <p className="text-gray-700 mt-2">{comment.content}</p>
                {auth?.user?.id === comment.user_id && (
                  <form method="post" action={`/comments/${comment.id}`} style={{ display: 'inline' }}>
                    <input type="hidden" name="_method" value="delete" />
                    <input type="hidden" name="_token" value={document.querySelector('meta[name="csrf-token"]')?.content} />
                    <button type="submit" className="text-red-600 text-sm mt-2">
                      Удалить
                    </button>
                  </form>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-600">Комментариев пока нет</p>
          )}
        </div>
      </div>
    </Layout>
  );
}
