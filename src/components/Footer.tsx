export default function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-slate-400">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <p>© {new Date().getFullYear()} WebinarHub. All rights reserved.</p>

          <div className="flex gap-4">
            <a className="hover:text-white">Privacy</a>
            <a className="hover:text-white">Terms</a>
            <a className="hover:text-white">Support</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
