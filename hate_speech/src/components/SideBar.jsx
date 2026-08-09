import {
  Plus,
  MessageSquare,
  Clock3,
  Shield,
  Settings,
  X,
  Menu
} from "lucide-react";

import { FaUserCircle } from "react-icons/fa";
import SidebarButton from "./SideBarButton";

export default function Sidebar({ open, setOpen }) {
  return (
    <>
      {/* Dark Overlay (Mobile Only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50
          h-screen w-72
          bg-[#151212]/95 backdrop-blur-xl
          border-r border-white/10

          flex flex-col

          transform transition-transform duration-300

          ${
            open ? "translate-x-0" : "-translate-x-full"
          }

          lg:translate-x-0
          lg:static
        `}
      >
        {/* Mobile Header */}
        <div className="flex items-center justify-between px-6 py-6 lg:hidden">
          <h1 className="text-2xl font-bold text-white">
            Flaggr
          </h1>

          <button onClick={() => setOpen(false)}>
            <X className="text-white" />
          </button>
        </div>

        {/* Desktop Header */}
        <div className="hidden lg:block px-8 py-8">
          <h1 className="text-3xl font-bold text-white">
            Flaggr
          </h1>

          <p className="text-sm text-gray-400">
            AI Moderation Assistant
          </p>
        </div>

        {/* New Chat */}

        <div className="px-6">

          <button
            className="
            w-full
            rounded-xl
            bg-gradient-to-r
            from-red-700
            to-red-900
            py-3
            flex
            items-center
            justify-center
            gap-3
            text-white
            transition
            hover:scale-[1.02]
            "
          >
            <Plus size={18} />
            New Chat
          </button>

        </div>

        {/* Navigation */}

        <div className="mt-8 flex flex-col gap-2 px-4">

          <SidebarButton
            icon={<MessageSquare size={18} />}
            title="Chats"
          />

          <SidebarButton
            icon={<Clock3 size={18} />}
            title="History"
          />

          <SidebarButton
            icon={<Shield size={18} />}
            title="Violations"
          />

          <SidebarButton
            icon={<Settings size={18} />}
            title="Settings"
          />

        </div>

        <div className="flex-1" />

        {/* Profile */}

        <div className="border-t border-white/10 p-6">

          <div className="flex items-center gap-3">

            <FaUserCircle
              size={42}
              className="text-white"
            />

            <div>

              <h2 className="text-white">
                Guest User
              </h2>

              <p className="text-sm text-gray-400">
                Create Profile
              </p>

            </div>

          </div>

        </div>

      </aside>
    </>
  );
}