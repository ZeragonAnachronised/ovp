import { Head, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Edit({ post }) {
  const { data, setData, put, errors } = useForm({
    title: post.title,
    content: post.content,
  });

  const submit = (e) => {
    e.preventDefault();
    put(`/posts/${post.id}`);
  };

  return (
    <Layout>
      <Head title="Изменить пост" />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Изменить пост (вы не можете менять изображение поста)</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Заголовок
            </label>
            <input
              type="text"
              value={data.title}
              onChange={(e) => setData('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.title && <span className="text-red-600 text-sm">{errors.title}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Содержимое
            </label>
            <textarea
              value={data.content}
              onChange={(e) => setData('content', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
              rows="8"
            />
            {errors.content && <span className="text-red-600 text-sm">{errors.content}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Обновить Пост
          </button>
        </form>
      </div>
    </Layout>
  );
}
