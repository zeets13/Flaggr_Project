import { FaShieldAlt, FaUserCircle } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="h-20 flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-10">

      <div className="flex items-center gap-3">

        <div className="h-11 w-11 rounded-xl bg-red-500/20 border border-red-500/30 flex items-center justify-center">
          <FaShieldAlt className="text-red-400 text-xl" />
        </div>

        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Flaggr
          </h1>

          <p className="text-sm text-gray-400">
            Harmul Speech Detection
          </p>
        </div>

      </div>

      <FaUserCircle
        size={34}
        className="text-gray-300 hover:text-white cursor-pointer transition"
      />

    </nav>
  );
}