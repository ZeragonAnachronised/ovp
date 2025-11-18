import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';
import Layout from '@/Layouts/Layout';

export default function Create() {
  const { data, setData, post, errors } = useForm({
    title: '',
    content: '',
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
      const file = e.target.files[0];
      setData('image', file);

      if (file) {
          setPreview(URL.createObjectURL(file));
      }
  };

  const submit = (e) => {
    e.preventDefault();
    post('/posts');
  };

  return (
    <Layout>
      <Head title="Создать пост" />
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Создать новый пост</h1>
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

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Изображение
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full"
            />
            {preview && (
                <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover mt-2 rounded"
                />
            )}
            {errors.image && <span className="text-red-600 text-sm">{errors.image}</span>}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Создать пост
          </button>
        </form>
      </div>
    </Layout>
  );
}
