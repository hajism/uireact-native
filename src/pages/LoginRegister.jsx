import { useState } from "react";

export default function LoginRegister() {
  const [mode, setMode] = useState("login");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
        {mode === "login" && <Login onRegister={() => setMode("register")} />}
        {mode === "register" && <Register onLogin={() => setMode("login")} />}
      </div>
    </div>
  );
}

/* ---------------- LOGIN ---------------- */

function Login({ onRegister }) {
  return (
    <>
      <Header />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Selamat Datang Kembali
      </h2>
      <p className="text-gray-600 mb-6">
        Masuk ke akun Anda untuk melanjutkan
      </p>

      <form className="space-y-4">
        <Input label="Email" placeholder="nama@email.com" />
        <Input label="Password" type="password" />

        <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
          Masuk
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-600">
        Belum punya akun?{" "}
        <button
          onClick={onRegister}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Daftar sekarang
        </button>
      </p>
    </>
  );
}

/* ---------------- REGISTER ---------------- */

function Register({ onLogin }) {
  return (
    <>
      <Header />

      <h2 className="text-2xl font-bold text-gray-900 mb-1">
        Buat Akun Baru
      </h2>
      <p className="text-gray-600 mb-6">
        Mulai perjalanan finansial Anda hari ini
      </p>

      <form className="space-y-4">
        <Input label="Nama Lengkap" />
        <Input label="Email" />
        <Input label="Password" type="password" />
        <Input label="Konfirmasi Password" type="password" />

        <button className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition">
          Daftar
        </button>
      </form>

      <p className="text-sm text-center mt-6 text-gray-600">
        Sudah punya akun?{" "}
        <button
          onClick={onLogin}
          className="text-indigo-600 font-semibold hover:underline"
        >
          Masuk sekarang
        </button>
      </p>
    </>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Header() {
  return (
    <div className="text-center mb-8">
      <div className="w-14 h-14 mx-auto rounded-full bg-indigo-600 flex items-center justify-center text-white text-xl mb-3">
        💰
      </div>
      <h1 className="text-3xl font-bold text-gray-900">FinanceFlow</h1>
      <p className="text-gray-600 text-sm">
        Kelola Keuangan Anda dengan Mudah
      </p>
    </div>
  );
}

function Input({ label, type = "text", placeholder }) {
  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
}
