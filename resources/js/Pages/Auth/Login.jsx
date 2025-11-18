import { Head, Link, useForm } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';

export default function Login() {
  const { data, setData, post, errors } = useForm({
    email: '',
    password: '',
  });

  const submit = (e) => {
    e.preventDefault();
    post('/login');
  };

  return (
    <Layout>
      <Head title="Login" />
      <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form onSubmit={submit}>
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

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Войти
          </button>
        </form>

        <p className="mt-4 text-center text-gray-600">
          Нет аккаунта? <Link href="/register" className="text-blue-600">Регистрация</Link>
        </p>
      </div>
    </Layout>
  );
}
