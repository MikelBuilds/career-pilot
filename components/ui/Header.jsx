import Link from "next/link";

const Header = () => {
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
        {/* Logo / Brand */}
        <Link href="/" className="text-lg font-semibold text-slate-900">
          Career<span className="text-indigo-600">Pilot</span>
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link
            href="/dashboard"
            className="hover:text-slate-900 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/login"
            className="hover:text-slate-900 transition"
          >
            Login
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
