import { FaShieldAlt, FaUserCircle } from "react-icons/fa";
import { Menu } from "lucide-react";
export default function Navbar({setSidebarOpen }) {
  return (
    <nav className="h-20 flex items-center justify-between px-4 py-5 sm:px-6 md:px-8 lg:px-10">

      <div className="flex items-center gap-4">

    <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden"
    >
        <Menu
            size={28}
            className="text-white"
        />
    </button>

    <div>

        <h1 className="text-2xl font-bold text-white">
            Flaggr
        </h1>

        <p className="text-sm text-gray-400 mt-1">
            Harmful Speech Detection System
        </p>

    </div>

</div>
    <hr className="border-t border-white/10 my-4" />
    

    </nav>
  );
}