import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Register() {
  const { data, setData, post, errors } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <Layout>
      <Head title="Register" />
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Регистрация</h1>
        <form onSubmit={submit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Имя
            </label>
            <input
              type="text"
              value={data.name}
              onChange={(e) => setData('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.name && <span className="text-red-600 text-sm">{errors.name}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.email && <span className="text-red-600 text-sm">{errors.email}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Пароль
            </label>
            <input
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
            {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Подтвердите пароль
            </label>
            <input
              type="password"
              value={data.password_confirmation}
              onChange={(e) => setData('password_confirmation', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Регистрация
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Уже есть аккаунт? <Link href="/login" className="text-blue-600">Войти</Link>
        </p>
      </div>
    </Layout>
  );
}
