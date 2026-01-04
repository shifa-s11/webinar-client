export default function Header() {
  return (
    <header className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <h1 className="text-xl font-bold text-blue-500">
          WebinarHub
        </h1>

        <nav className="hidden gap-6 md:flex">
          <a className="text-sm text-slate-300 hover:text-white cursor-pointer">Home</a>
          <a className="text-sm text-slate-300 hover:text-white cursor-pointer">Webinars</a>
          <a className="text-sm text-slate-300 hover:text-white cursor-pointer">About</a>
          <a className="text-sm text-slate-300 hover:text-white cursor-pointer">Contact</a>
        </nav>

        <button className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          Sign In
        </button>
      </div>
    </header>
  );
}
